
import { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactModal.css";
import {
  validateField,
  validateForm,
  isFormStructurallyValid,
} from "./contactValidation";

export function ContactModal({
  emailDestino = "jcdevelopment94@gmail.com",
  whatsapp = "34600658452",
}) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "Consulta desde el portfolio",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [botField, setBotField] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const marcarTodoTocado = () =>
    setTouched({
      nombre: true,
      email: true,
      asunto: true,
      mensaje: true,
    });

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (botField) return;

    const { isValid, errors: newErrors } = validateForm(form);
    setErrors(newErrors);
    marcarTodoTocado();

    if (!isValid) return;

    setLoading(true);
    setMessageStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // envio de email a mi mismo
    const adminParams = {
      to_email: emailDestino,
      subject: `[Portfolio] ${form.asunto}`,
      contenido:
        `Nuevo mensaje desde el portfolio\n\n` +
        `Nombre: ${form.nombre}\n` +
        `Email: ${form.email}\n` +
        `Asunto: ${form.asunto}\n\n` +
        `Mensaje:\n${form.mensaje}`,
      reply_to: form.email,
    };

    // Auto-respuesta al usuario
    const autoReplyParams = {
      to_email: form.email,
      subject: "Gracias por tu mensaje",
      contenido:
        `Hola ${form.nombre},\n\n` +
        `Gracias por ponerte en contacto conmigo a través de mi portfolio.\n` +
        `He recibido tu mensaje correctamente y te responderé lo antes posible.\n\n` +
        `Un saludo,\n` +
        `JC\n` +
        `Desarrollador Full Stack`,
      reply_to: emailDestino,
    };

    try {
      const [r1, r2] = await Promise.all([
        emailjs.send(serviceId, templateId, adminParams, publicKey),
        emailjs.send(serviceId, templateId, autoReplyParams, publicKey),
      ]);

      if (r1.status === 200 && r2.status === 200) {
        setMessageStatus({
          type: "success",
          message: "✓ Mensaje enviado correctamente. Gracias por contactarme.",
        });

        setForm({
          nombre: "",
          email: "",
          asunto: "Consulta desde el portfolio",
          mensaje: "",
        });
        setErrors({});
        setTouched({});

        // Cerrar modal después de 2 segundos
        setTimeout(() => {
          const modalElement = document.getElementById("contactModal");
          if (!modalElement) return;

          //  Intento con Bootstrap (si existe)
          if (window.bootstrap?.Modal) {
            const modalInstance =
              window.bootstrap.Modal.getInstance(modalElement) ||
              new window.bootstrap.Modal(modalElement);

            modalInstance.hide();
          } else {
            //  Fallback manual si Bootstrap no está disponible
            modalElement.classList.remove("show");
            modalElement.style.display = "none";
            modalElement.setAttribute("aria-hidden", "true");

            document.body.classList.remove("modal-open");
            document.body.style.removeProperty("padding-right");

            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) backdrop.remove();
          }

          setMessageStatus(null);
        }, 2000);
      } else {
        throw new Error("EmailJS respondió con estado no esperado");
      }
    } catch (error) {
      console.error("Error al enviar email:", error);
      setMessageStatus({
        type: "error",
        message:
          "✗ Error al enviar el mensaje. Por favor intenta de nuevo o usa WhatsApp.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (botField) return;

    const { isValid, errors: newErrors } = validateForm(form);
    setErrors(newErrors);
    marcarTodoTocado();

    if (!isValid) return;

    const text = encodeURIComponent(
      `Hola, soy ${form.nombre}.\n\n${form.mensaje}\n\n(${form.email})`
    );
    window.open(`https://wa.me/${whatsapp}?text=${text}`, "_blank");
  };

  const isFormValid = isFormStructurallyValid(form);

  return (
    <div
      className="modal fade"
      id="contactModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered contact-modal-dialog">
        <div className="modal-content contact-modal">
          <form onSubmit={handleSendEmail} noValidate>
            <input
              type="text"
              name="company"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              className="d-none"
              autoComplete="off"
              tabIndex={-1}
            />

            <div className="modal-header contact-modal-header">
              <div>
                <h5 className="modal-title mb-0">Contacto</h5>
                <p className="contact-modal-subtitle mb-0">
                  Cuéntame tu idea y te respondo cuanto antes.
                </p>
              </div>
              <button
                type="button"
                className="btn-close contact-modal-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>

            <div className="modal-body contact-modal-body">
              <div className="mb-3 position-relative">
                <label className="form-label contact-label">Nombre</label>
                <div className="input-wrap">
                  <input
                    className={`form-control contact-input ${errors.nombre && touched.nombre ? "is-invalid" : ""
                      }`}
                    name="nombre"
                    value={form.nombre}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Tu nombre"
                    required
                    maxLength={60}
                  />
                  {touched.nombre && !errors.nombre && (
                    <i className="bi bi-check-circle-fill input-icon success show"></i>
                  )}
                  {touched.nombre && errors.nombre && (
                    <i className="bi bi-x-circle-fill input-icon error show"></i>
                  )}
                  {errors.nombre && touched.nombre && (
                    <div className="invalid-feedback">{errors.nombre}</div>
                  )}
                </div>
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label contact-label">Email</label>
                <div className="input-wrap">
                  <input
                    type="email"
                    className={`form-control contact-input ${errors.email && touched.email ? "is-invalid" : ""
                      }`}
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="tucorreo@dominio.com"
                    required
                    maxLength={120}
                  />
                  {touched.email && !errors.email && (
                    <i className="bi bi-check-circle-fill input-icon success show"></i>
                  )}

                  {touched.email && errors.email && (
                    <i className="bi bi-x-circle-fill input-icon error show"></i>
                  )}

                  {errors.email && touched.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label contact-label">Asunto</label>
                <div className="input-wrap">
                  <input
                    className={`form-control contact-input ${errors.asunto && touched.asunto ? "is-invalid" : ""
                      }`}
                    name="asunto"
                    value={form.asunto}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Asunto de tu mensaje"
                    maxLength={120}
                  />
                  {touched.asunto && !errors.asunto && (
                    <i className="bi bi-check-circle-fill input-icon success show"></i>
                  )}

                  {touched.asunto && errors.asunto && (
                    <i className="bi bi-x-circle-fill input-icon error show"></i>
                  )}

                  {errors.asunto && touched.asunto && (
                    <div className="invalid-feedback">{errors.asunto}</div>
                  )}
                </div>
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label contact-label">Mensaje</label>
                <div className="input-wrap">
                  <textarea
                    className={`form-control contact-input contact-textarea ${errors.mensaje && touched.mensaje ? "is-invalid" : ""
                      }`}
                    name="mensaje"
                    rows="4"
                    value={form.mensaje}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder="Cuéntame tu idea o necesidad…"
                    required
                    maxLength={1200}
                  />
                  {touched.mensaje && !errors.mensaje && (
                    <i className="bi bi-check-circle-fill input-icon success show"></i>
                  )}

                  {touched.mensaje && errors.mensaje && (
                    <i className="bi bi-x-circle-fill input-icon error show"></i>
                  )}

                  {errors.mensaje && touched.mensaje && (
                    <div className="invalid-feedback">{errors.mensaje}</div>
                  )}
                </div>
              </div>

              <div className="small contact-privacy">
                <i className="bi bi-shield-check me-1"></i>
                No guardo tus datos: el envío se hace directamente por tu
                email o WhatsApp.
              </div>

              {messageStatus && (
                <div
                  className={`alert ${messageStatus.type === "success"
                    ? "alert-success"
                    : "alert-danger"
                    } mt-3 mb-0`}
                  role="alert"
                >
                  {messageStatus.message}
                </div>
              )}
            </div>

            <div className="modal-footer contact-modal-footer d-flex flex-column flex-sm-row gap-2">
              <button
                type="submit"
                className="btn contact-btn-email w-100"
                disabled={!isFormValid || loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-envelope me-1"></i> Enviar por email
                  </>
                )}
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="btn contact-btn-wa w-100"
                type="button"
                disabled={!isFormValid || loading}
              >
                <i className="bi bi-whatsapp me-1"></i> WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
