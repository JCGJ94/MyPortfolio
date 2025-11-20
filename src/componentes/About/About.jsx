import "./About.css";

export function About() {
  return (
    <section id="about" className="about-section section-overlap-top py-6">
      <div className="container">
        <div className="row g-5 align-items-center">

          <div className="col-12 col-lg-5">
            <div className="about-stats">

              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <div>
                  <h3 className="stat-number">2 Years</h3>
                  <p className="stat-label">Job Experience</p>
                </div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-code-slash"></i>
                </div>
                <div>
                  <h3 className="stat-number">8+ Projects</h3>
                  <p className="stat-label">Completed</p>
                </div>
              </div>

            </div>
          </div>

          <div className="col-12 col-lg-7">
            <div className="about-text">
              <h3 className="about-title text-gradient">
                ¿Cuáles son mis lados y <span>habilidades</span> más fuertes?
              </h3>

              <p>
                Soy un desarrollador <strong>full stack </strong> orientado al
                <strong> frontend</strong>, especializado en crear interfaces
                <strong> modernas, rápidas y centradas en la experiencia de usuario </strong>
                utilizando <strong>React, Bootstrap y CSS</strong>.
              </p>

              <p>
                En backend trabajo con <strong>Python, Flask y PostgreSQL</strong>,
                construyendo <strong>APIs limpias, escalables y eficientes</strong>,
                siempre respetando las <strong> buenas prácticas de desarrollo </strong>
                y aplicando principios de <strong>código limpio y mantenible</strong>.
              </p>

              <p>
                Me apasiona <strong>resolver problemas complejos con soluciones simples y efectivas</strong>,
                organizar proyectos en <strong>tareas claras y estructuradas</strong>,
                y garantizar que cada entrega aporte <strong>valor real</strong>.
              </p>

              <p>
                Soy una persona <strong>colaborativa, proactiva y orientada al detalle</strong>,
                con ganas de seguir aprendiendo y crecer profesionalmente.
                Disfruto trabajar en equipo, compartir ideas y fomentar un entorno de <strong>
                  innovación y calidad</strong> para que cada proyecto supere las expectativas.
              </p>
            </div>
          </div>        
        </div>
      </div>
    </section>
  );
}
