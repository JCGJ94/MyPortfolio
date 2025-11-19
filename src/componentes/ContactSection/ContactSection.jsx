export function ContactSection({ social }) {
  return (
    <section id="contact"  className="py-6 section-overlap-top">
      <div className="container">
        <div className="bg-white rounded-4 shadow p-4 p-lg-5 border-left-accent-1">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <div>
              <h2 className="h3 fw-bold mb-2 text-gradient">¿Hablamos?</h2>
              <p className="text-secondary mb-0 ">
                Abierto a colaborar en proyectos y oportunidades full-time.
              </p>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#contactModal"
              >
                <i className="bi bi-chat-dots me-1"></i> Enviar mensaje
              </button>
              <a
                href={social.linkedin}
                className="btn btn-outline-secondary"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-linkedin me-1"></i> LinkedIn
              </a>
              <a
                href={social.github}
                className="btn btn-dark"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-github me-1"></i> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
