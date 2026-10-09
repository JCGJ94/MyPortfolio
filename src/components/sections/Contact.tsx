'use client';

import * as React from 'react';
import { AlertCircle, Check, Copy, FileText, Linkedin, Mail, Globe, MessageSquare, Send, User } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TechIcon } from '@/components/ui/TechIcon';
import { useLanguage } from '@/context/LanguageContext';

type ContactFormData = { name: string; email: string; message: string };

// Decorative leading icon per field; the visible label stays the accessible name.
const fieldIcons = { name: User, email: Mail, message: MessageSquare } as const;

// zod is fetched on first form interaction, not with the page (it is ~65 KB gzipped).
const loadSchema = () =>
  import('zod').then(({ z }) => {
    const contactSchema = z.object({
      name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
      email: z.string().email('Correo electrónico no válido'),
      message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
    });
    return contactSchema;
  });
type ContactSchema = Awaited<ReturnType<typeof loadSchema>>;

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = React.useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [schema, setSchema] = React.useState<ContactSchema | null>(null);
  const warmSchema = () => { void loadSchema().then(setSchema); };
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    const contactSchema = schema ?? (await loadSchema());
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          const field = err.path[0] as keyof ContactFormData;
          fieldErrors[field] = t.contact.errors[field];
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'default_service';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_id';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key';

      const adminParams = {
        to_email: 'jcdevelopment94@gmail.com',
        subject: `[Portfolio] Mensaje de ${formData.name}`,
        contenido: `Nuevo mensaje desde el portfolio\n\nNombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`,
        reply_to: formData.email,
      };

      const autoReplyParams = {
        to_email: formData.email,
        subject: "Gracias por tu mensaje",
        contenido: `Hola ${formData.name},\n\nGracias por ponerte en contacto conmigo a través de mi portfolio.\nHe recibido tu mensaje correctamente y te responderé lo antes posible.\n\nUn saludo,\nJC\nDesarrollador Full Stack`,
        reply_to: 'jcdevelopment94@gmail.com',
      };

      // Loaded on submit only: the SDK is not needed to paint or interact with the page.
      const { default: emailjs } = await import('@emailjs/browser');
      const [r1, r2] = await Promise.all([
        emailjs.send(serviceId, templateId, adminParams, publicKey),
        emailjs.send(serviceId, templateId, autoReplyParams, publicKey),
      ]);

      if (r1.status === 200 && r2.status === 200) {
        setIsSuccess(true);
      } else {
        throw new Error("EmailJS respondió con estado no esperado");
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitError(t.contact.errors.submit);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const [touched, setTouched] = React.useState<Partial<Record<keyof ContactFormData, boolean>>>({});
  const [copied, setCopied] = React.useState(false);
  const fieldError = (field: keyof ContactFormData) =>
    !schema || schema.shape[field].safeParse(formData[field]).success ? undefined : t.contact.errors[field];
  const shown = (field: keyof ContactFormData) =>
    errors[field] ?? (touched[field] ? fieldError(field) : undefined);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactFormData;
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('jcdevelopment94@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // ponytail: clipboard blocked (insecure context); the mailto link stays as the fallback
    }
  };

  const field = (
    name: keyof ContactFormData,
    label: string,
    placeholder: string,
    extra?: React.ReactNode,
  ) => {
    const err = shown(name);
    const ok = !err && touched[name] && formData[name].length > 0;
    const Icon = fieldIcons[name];
    const common = {
      id: name,
      name,
      required: true,
      value: formData[name],
      onChange: handleChange,
      onBlur: handleBlur,
      className: 'pv3-contact__field',
      placeholder,
      'aria-invalid': Boolean(err),
      'aria-describedby': err ? `${name}-error` : undefined,
    };
    return (
      <div className="pv3-contact__group" data-state={err ? 'error' : ok ? 'ok' : undefined}>
        <div className="pv3-contact__control">
          <Icon aria-hidden="true" focusable="false" size={18} className="pv3-contact__fi" />
          {name === 'message'
            ? <textarea rows={6} {...common} />
            : <input type={name === 'email' ? 'email' : 'text'} autoComplete={name} {...common} />}
          <label htmlFor={name} className="pv3-contact__float">{label}</label>
        </div>
        <div className="pv3-contact__meta">
          {err
            ? <p id={`${name}-error`} className="pv3-contact__error" role="alert"><AlertCircle aria-hidden="true" focusable="false" size={15} />{err}</p>
            : <span />}
          {extra}
        </div>
      </div>
    );
  };

  return (
    <section id="contact" className="pv3-section pv3-contact">
      <div className="pv3-section__inner">
        <SectionLabel index="04" label={t.sectionLabel.contact} />
        <div className="pv3-contact__panel">
          <header className="pv3-contact__head">
            <h2 className="pv3-contact__title">
              {t.contact.title} <span>{t.contact.titleSpan}</span>
            </h2>
            <p className="pv3-contact__lede">{t.contact.description}</p>
            <p className="pv3-contact__avail"><span aria-hidden="true" className="pv3-contact__dot" />{t.hero.badge}</p>
            <p className="pv3-contact__label">{t.contact.writeMe}</p>
            <div className="pv3-contact__mailrow">
              <span className="pv3-contact__badge" aria-hidden="true"><Mail size={18} /></span>
              <a href="mailto:jcdevelopment94@gmail.com" className="pv3-contact__mail pv3-focus">jcdevelopment94@gmail.com</a>
              <button type="button" onClick={copyEmail} className="pv3-contact__copy pv3-focus">
                {copied ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
                {copied ? t.contact.copied : t.contact.copyEmail}
              </button>
              <span className="pv3-contact__sr" role="status">{copied ? t.contact.copied : ''}</span>
            </div>
            <p className="pv3-contact__place"><Globe aria-hidden="true" focusable="false" size={16} />{t.contact.location}</p>
            <p className="pv3-contact__label">{t.contact.elsewhere}</p>
            <ul className="pv3-contact__links">
              <li><a href="https://github.com/JCGJ94" target="_blank" rel="noopener noreferrer" className="pv3-focus"><TechIcon name="GitHub" />GitHub</a></li>
              <li><a href="https://linkedin.com/in/josecgonzález" target="_blank" rel="noopener noreferrer" className="pv3-focus"><Linkedin aria-hidden="true" focusable="false" size={16} className="pv3-contact__in" />LinkedIn</a></li>
              <li><a href="/JoseCarlos-CV.pdf" target="_blank" rel="noopener noreferrer" className="pv3-focus"><FileText aria-hidden="true" size={16} />{t.hero.downloadCv}</a></li>
            </ul>
          </header>

          {isSuccess ? (
            <div className="pv3-contact__done" role="status">
              <span className="pv3-contact__tick" aria-hidden="true"><Check size={28} /></span>
              <h3>{t.contact.successTitle}</h3>
              <p>{t.contact.successMsg(formData.name.split(' ')[0])}</p>
              <button type="button" onClick={() => { setIsSuccess(false); setTouched({}); setFormData({ name: '', email: '', message: '' }); }} className="pv3-contact__again pv3-focus">
                {t.contact.sendAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} onFocusCapture={warmSchema} className="pv3-contact__form" noValidate>
              <div className="pv3-contact__pair">
                {field('name', t.contact.formName, t.contact.formNamePlaceholder)}
                {field('email', t.contact.formEmail, t.contact.formEmailPlaceholder)}
              </div>
              {field('message', t.contact.formMessage, t.contact.formMessagePlaceholder,
                <span className="pv3-contact__count" data-met={formData.message.trim().length >= 10 || undefined}>
                  {formData.message.length} · {t.contact.hintMin}
                </span>)}

              {submitError && <p className="pv3-contact__error pv3-contact__error--form" role="alert"><AlertCircle aria-hidden="true" focusable="false" size={16} />{submitError}</p>}

              <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="pv3-contact__submit pv3-focus">
                <span>{isSubmitting ? t.contact.formSubmitting : t.contact.formSubmit}</span>
                <Send aria-hidden="true" size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
