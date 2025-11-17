import "./Certs.css"

export function Certs({ certs, education, social }) {
  return (
    <section id="certs" className="py-6 bg-light ">
      <div className="container">
        <h2 className="h3 fw-bold text-center mb-4 text-gradient-2">
          Certificaciones & Formación
        </h2>

        <div className="row g-4 ">
          <div className="col-12 col-lg-7">
            <div className="p-4 rounded-4 shadow-sm bg-white border-left-accent-3">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-award-fill me-2 text-warning"></i>
                Certificaciones
              </h5>
              <ul className="list-unstyled mb-0">
                {certs.map((c) => (
                  <li key={c.title} className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{c.title}</strong> —{' '}
                        <span className="text-secondary">{c.org}</span>
                      </div>
                      <span className="badge bg-dark-subtle text-dark">
                        {c.year}
                      </span>
                    </div>
                    {c.link && (
                      <a
                        href={c.link}
                        className="small"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ver credencial
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <div className="p-4 rounded-4 shadow-sm bg-white border-left-accent-4">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-mortarboard-fill me-2 text-info"></i>
                Formación
              </h5>
              <ul className="list-unstyled mb-0">
                {education.map((e) => (
                  <li key={e.title} className="mb-3">
                    <strong>{e.title}</strong> —{' '}
                    <span className="text-secondary">{e.org}</span>
                    <div className="small text-muted">
                      {e.year} · {e.detail}
                    </div>
                  </li>
                ))}
              </ul>
              <a
                className="btn btn-info-subtle btn-sm mt-2"
                href={social.cv}
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-download me-1"></i> Descargar CV (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
