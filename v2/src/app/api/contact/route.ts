import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

// Initialize Resend with a dummy key for build time if the env variable is missing
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : new Resend('re_dummy_key_for_build');

// Validation schema
const contactSchema = z.object({
    name: z.string().min(2, 'Name is too short').max(100, 'Name is too long'),
    email: z.string().email('Invalid email address'),
    message: z.string().min(10, 'Message is too short').max(2000, 'Message is too long'),
    honeypot: z.string().optional(), // Anti-spam
});

// Basic in-memory rate limiter (simple protection for MVP)
const rateLimit = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimit.get(ip);

    if (!record) {
        rateLimit.set(ip, { count: 1, timestamp: now });
        return false;
    }

    if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
        rateLimit.set(ip, { count: 1, timestamp: now });
        return false;
    }

    record.count += 1;
    return record.count > MAX_REQUESTS_PER_WINDOW;
}

export async function POST(request: Request) {
    try {
        // 1. Rate Limiting Check
        const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // 2. Parse payload
        const body = await request.json();

        // 3. Validate payload with Zod
        const result = contactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: 'Invalid payload', details: result.error.issues },
                { status: 400 }
            );
        }

        const { name, email, message, honeypot } = result.data;

        // 4. Honeypot check (if filled, it's a bot)
        if (honeypot) {
            // Act as if it succeeded to fool the bot
            return NextResponse.json({ success: true }, { status: 200 });
        }

        // 5. Send Email to Admin
        await resend.emails.send({
            from: 'Portfolio V2 Contact <onboarding@resend.dev>', // Update with verified domain in production
            to: 'jcdevelopment94@gmail.com',
            subject: `New Contact Request from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        // 6. Send Auto-reply to User
        await resend.emails.send({
            from: 'Jose Carlos <onboarding@resend.dev>', // Update with verified domain in production
            to: email,
            subject: 'Gracias por contactarme / Thanks for reaching out',
            text: `Hola ${name},\n\nHe recibido tu mensaje correctamente y me pondré en contacto contigo lo antes posible.\n\nAquí tienes una copia de tu mensaje:\n"${message}"\n\nSaludos,\nJose Carlos\nSenior Software Engineer`,
        });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        // Avoid exposing stack traces in production response
        console.error('Contact API Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error. Please try again later.' },
            { status: 500 }
        );
    }
}
