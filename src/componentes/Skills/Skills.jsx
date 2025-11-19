import React from 'react'
import './Skills.css'
import { WaveDivider } from '../WaveDivider/WaveDivider'

function TechCard({ src, alt, label }) {
  return (
    <div className="col-6 col-md-4">
      <div className="tech-card">
        {src && <img src={src} alt={alt || label} />}
        <p>{label}</p>
      </div>
    </div>
  )
}

const SKILLS = {
  frontend: [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", label: "React" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", label: "JavaScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", label: "Bootstrap" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", label: "CSS3" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", label: "HTML5" },
  ],

  backend: [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", label: "Python" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg", label: "Flask" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", label: "PostgreSQL" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg", label: "SQLAlchemy" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg", label: "Postman" },
  ],

  tools: [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", label: "GitHub" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", label: "Git" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", label: "VSCode" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", label: "Figma" },
  ],

  communication: [
    { code: "ES", label: "Español", level: "Nativo" },
    { code: "EN", label: "Inglés", level: "Nivel medio" },
  ],
}

export function Skills() {
  return (
    <section id="skills" className="py-6 bg-light section-overlap-top skills-section section-with-wave">
      <div className="container">
        <p className="fs-1 fw-bold mb-4 text-center text-gradient">
          Stack Técnico
        </p>

        <div className="skills-tree">
          <svg className="skills-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M50 5 L50 65" />
            <path d="M50 25 L20 25" />
            <path d="M50 25 L80 25" />
            <path d="M50 25 L50 25" />
            <path d="M50 65 L50 95" />
          </svg>


          <div className="row g-4 skills-branch-row">
            <div className="col-12 col-lg-4">
              <div className="skills-group skills-group-1 p-4 rounded-4 shadow-sm bg-white border-left-accent-1 h-100">
                <h5 className="fw-bold mb-4 text-center text-gradient">
                  <i className="bi bi-stars me-2 text-primary"></i>Frontend
                </h5>
                <div className="row g-3 text-center">
                  {SKILLS.frontend.map(skill => (
                    <TechCard key={skill.label} {...skill} />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="skills-group skills-group-2 p-4 rounded-4 shadow-sm bg-white border-left-accent-2 h-100">
                <h5 className="fw-bold text-center text-gradient mb-4">
                  <i className="bi bi-cpu me-2 text-danger"></i>Backend
                </h5>
                <div className="row g-3 text-center">
                  {SKILLS.backend.map(skill => (
                    <TechCard key={skill.label} {...skill} />
                  ))}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="skills-group skills-group-3 p-4 rounded-4 shadow-sm bg-white border-left-accent-3 h-100">
                <h5 className="fw-bold text-center text-gradient mb-4">
                  <i className="bi bi-tools me-2 text-success"></i>Herramientas &amp; DevOps
                </h5>
                <div className="row g-3 text-center">
                  {SKILLS.tools.map(skill => (
                    <TechCard key={skill.label} {...skill} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4">
            <div className="col-12 col-lg-5">
              <div className="skills-group skills-group-4 p-4 rounded-4 shadow-sm bg-white border-left-accent-4 h-100">
                <h5 className="fw-bold text-center text-gradient mb-4">
                  <i className="bi bi-chat-dots me-2 text-success"></i>
                  Habilidades de Comunicación 
                </h5>
                <div className="row g-3 text-center">
                  {SKILLS.communication.map(lang => (
                    <div className="col-6" key={lang.code}>
                      <div className="tech-card language-card">
                        <div className={`language-icon language-icon-${lang.code.toLowerCase()}`}>
                          {lang.code}
                        </div>
                        <p>{lang.label}</p>
                        <span>{lang.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
