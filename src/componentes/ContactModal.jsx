
import { useState } from "react";

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

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const buildResumen = () =>
    `Nombre: ${form.nombre}\nEmail: ${form.email}\nAsunto: ${form.asunto}\n\nMensaje:\n${form.mensaje}`;

  const handleSendEmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.asunto || "Contacto");
    const body = encodeURIComponent(buildResumen());
    window.location.href = `mailto:${emailDestino}?subject=${subject}&body=${body}`;
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hola, soy ${form.nombre}.\n\n${form.mensaje}\n\n(${form.email})`
    );
    window.open(`https://wa.me/${whatsapp}?text=${text}`, "_blank");
  };

  return (
    <div className="modal fade" id="contactModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSendEmail}>
            <div className="modal-header">
              <h5 className="modal-title">Contacto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  className="form-control"
                  name="nombre"
                  value={form.nombre}
                  onChange={onChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="tucorreo@dominio.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Asunto</label>
                <input
                  className="form-control"
                  name="asunto"
                  value={form.asunto}
                  onChange={onChange}
                  placeholder="Asunto de tu mensaje"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea
                  className="form-control"
                  name="mensaje"
                  rows="4"
                  value={form.mensaje}
                  onChange={onChange}
                  placeholder="Cuéntame tu idea o necesidad…"
                  required
                />
              </div>

              <div className="small text-secondary">
                * No se envían datos a servidores: el envío es directo por tu email o WhatsApp.
              </div>
            </div>

            <div className="modal-footer d-flex flex-column flex-sm-row gap-2">
              <button type="submit" className="btn btn-primary w-100">
                <i className="bi bi-envelope me-1"></i> Enviar por email
              </button>
              <button onClick={handleSendWhatsApp} className="btn btn-success w-100" type="button">
                <i className="bi bi-whatsapp me-1"></i> WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
