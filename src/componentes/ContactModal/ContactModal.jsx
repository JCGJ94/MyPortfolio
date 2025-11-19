
import { useState } from "react";
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

  const buildResumen = () =>
    `Nombre: ${form.nombre}\nEmail: ${form.email}\nAsunto: ${form.asunto}\n\nMensaje:\n${form.mensaje}`;

  const marcarTodoTocado = () =>
    setTouched({
      nombre: true,
      email: true,
      asunto: true,
      mensaje: true,
    });

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (botField) return;

    const { isValid, errors: newErrors } = validateForm(form);
    setErrors(newErrors);
    marcarTodoTocado();

    if (!isValid) return;

    const subject = encodeURIComponent(form.asunto || "Contacto");
    const body = encodeURIComponent(buildResumen());
    window.location.href = `mailto:${emailDestino}?subject=${subject}&body=${body}`;
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
            </div>

            <div className="modal-footer contact-modal-footer d-flex flex-column flex-sm-row gap-2">
              <button
                type="submit"
                className="btn contact-btn-email w-100"
                disabled={!isFormValid}
              >
                <i className="bi bi-envelope me-1"></i> Enviar por email
              </button>
              <button
                onClick={handleSendWhatsApp}
                className="btn contact-btn-wa w-100"
                type="button"
                disabled={!isFormValid}
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
