'use client';

import * as React from 'react';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Loader2, CheckCircle2, Send, Mail, User, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '@/context/LanguageContext';

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Correo electrónico no válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = React.useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSubmitError(null);

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Configuration for EmailJS
      // The user should set these in .env.local
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'default_service';
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_id';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'public_key';

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        publicKey
      );

      setIsSuccess(true);
      // setFormData({ name: '', email: '', message: '' }); // Moved to success button click

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitError('Hubo un problema al enviar el mensaje. Por favor, verifica tu configuración de EmailJS o inténtalo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-10 lg:py-16 bg-secondary/10 relative overflow-hidden flex flex-col justify-center min-h-[100dvh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 text-center text-balance">{t.contact.title} <span className="text-primary">{t.contact.titleSpan}</span></h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto font-medium">
              {t.contact.description} <br />
              <span className="text-primary/70 text-sm font-bold uppercase tracking-widest mt-4 block">{t.contact.guarantee}</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Contact Info */}
            <motion.div
              className="flex flex-col space-y-8 h-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="p-8 md:p-10 rounded-3xl border border-border bg-card/50 backdrop-blur-sm shadow-xl space-y-8 flex-1 flex flex-col justify-center w-full">
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary shrink-0">
                    <Mail className="h-7 w-7" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">{t.contact.writeMe}</p>
                    <p className="font-bold text-lg md:text-xl truncate" title="jcdevelopment94@gmail.com">jcdevelopment94@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0">
                    <MessageSquare className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">{t.contact.chat}</p>
                    <p className="font-bold text-lg md:text-xl">{t.contact.chatStatus}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-3xl border-2 border-primary/20 bg-primary/5 flex items-center justify-between group cursor-default relative overflow-hidden shrink-0">
                <div className="space-y-1 relative z-10">
                  <p className="text-xl font-black tracking-tight">{t.contact.coffee}</p>
                  <p className="text-sm text-muted-foreground">{t.contact.location}</p>
                </div>

                {/* Custom Canary Islands SVG with Location Pin */}
                <div className="relative w-24 h-24 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-primary/30" fill="currentColor">
                    {/* Lanzarote */}
                    <path d="M75,20 Q80,15 85,18 Q90,25 88,30 Q80,25 75,20 Z" />
                    {/* Fuerteventura */}
                    <path d="M70,35 Q75,30 80,45 Q75,55 65,50 Q72,40 70,35 Z" />
                    {/* Gran Canaria */}
                    <path d="M55,50 Q65,45 60,60 Q50,65 55,50 Z" />
                    {/* Tenerife */}
                    <path d="M40,45 Q45,35 50,55 Q40,60 35,50 Z" />
                    {/* La Gomera */}
                    <path d="M30,55 Q35,52 33,60 Q28,58 30,55 Z" />
                    {/* La Palma */}
                    <path d="M25,40 Q30,35 28,45 Q22,48 25,40 Z" />
                    {/* El Hierro */}
                    <path d="M20,60 Q25,58 22,65 Q18,63 20,60 Z" />
                  </svg>

                  {/* Pin pointing to Tenerife (x:45, y:45) */}
                  <motion.div
                    className="absolute top-[25%] left-[38%] text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  >
                    <MapPin className="w-6 h-6 fill-primary/20" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="flex flex-col h-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-card border-2 border-border shadow-2xl rounded-3xl p-8 md:p-10 relative overflow-hidden flex-1 flex flex-col justify-center w-full">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                    >
                      <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-8"
                        initial={{ rotate: -90 }}
                        animate={{ rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle2 className="w-10 h-10" />
                      </motion.div>
                      <h3 className="text-3xl font-black tracking-tight mb-4">{t.contact.successTitle}</h3>
                      <p className="text-muted-foreground mb-8 text-lg font-medium leading-relaxed">
                        {t.contact.successMsg(formData.name.split(' ')[0])}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsSuccess(false)}
                        className="text-primary font-bold uppercase tracking-widest text-sm hover:underline"
                      >
                        {t.contact.sendAnother}
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t.contact.formName}</label>
                          <div className="relative group">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              className="flex h-12 w-full rounded-2xl border-2 border-border bg-background/50 pl-10 pr-4 text-sm font-medium focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                              placeholder={t.contact.formNamePlaceholder}
                            />
                          </div>
                          {errors.name && <p className="text-xs text-destructive font-bold mt-1">{errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t.contact.formEmail}</label>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              className="flex h-12 w-full rounded-2xl border-2 border-border bg-background/50 pl-10 pr-4 text-sm font-medium focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-inner"
                              placeholder={t.contact.formEmailPlaceholder}
                            />
                          </div>
                          {errors.email && <p className="text-xs text-destructive font-bold mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">{t.contact.formMessage}</label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="flex w-full rounded-2xl border-2 border-border bg-background/50 p-4 text-sm font-medium focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none shadow-inner"
                          placeholder={t.contact.formMessagePlaceholder}
                        />
                        {errors.message && <p className="text-xs text-destructive font-bold mt-1">{errors.message}</p>}
                      </div>

                      {submitError && (
                        <motion.div
                          className="p-4 bg-destructive/10 text-destructive text-sm rounded-2xl font-bold border border-destructive/20"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {submitError}
                        </motion.div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed group border-b-4 border-primary-foreground/20 active:border-b-0"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                            {t.contact.formSubmitting}
                          </>
                        ) : (
                          <>
                            {t.contact.formSubmit}
                            <Send className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-0" />
    </section>
  );
}
