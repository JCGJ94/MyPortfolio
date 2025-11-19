
import { useState } from 'react'
import './Projects.css'


function ProjectCard({ project }) {
  return (
    <div className="card project-card h-100 border-0">
      <img
        src={project.image}
        className="card-img-top project-img"
        alt={project.title}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title mb-2">{project.title}</h5>
        <p className="card-text text-secondary small flex-grow-1">
          {project.desc}
        </p>

        <div className="d-flex flex-wrap gap-1 mb-3">
          {project.stack.map((t) => (
            <span key={t} className="badge bg-badge-1">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto d-flex flex-wrap gap-2">
          <a
            className="btn btn-sm btn-hero-primary"
            href={project.link}
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-box-arrow-up-right me-1"></i> Demo
          </a>
          <a
            className="btn btn-sm btn-hero-outline"
            href={project.repo}
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-code-slash me-1"></i> Código
          </a>
        </div>
      </div>
    </div>
  )
}

export function Projects({ projects, social }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = projects.length

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total)
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % total)
  }

  const getPositionClass = (index) => {
    if (index === activeIndex) return 'active'
    if (index === (activeIndex - 1 + total) % total) return 'prev'
    if (index === (activeIndex + 1) % total) return 'next'
    return 'hidden'
  }

  return (
    <section id="projects" className="py-6 projects-section section-overlap-top">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center g-5 mb-3">
          <h2 className="h3 fw-bold mb-0 text-gradient-2 mx-5 ">Proyectos Destacados</h2>
          <a href={social.github} className="btn btn-outline-light btn-sm d-none d-md-inline-flex">
            <i className="bi bi-github me-1"></i> Ver más
          </a>
        </div>

        <div className="projects-carousel position-relative">
          <button
            type="button"
            className="projects-arrow projects-arrow-left"
            onClick={goPrev}
            aria-label="Proyecto anterior"
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <div className="projects-track">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={`project-slide ${getPositionClass(index)}`}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="projects-arrow projects-arrow-right"
            onClick={goNext}
            aria-label="Proyecto siguiente"
          >
            <i className="bi bi-chevron-right"></i>
          </button>

          <div className="projects-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`projects-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Ir al proyecto ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 d-md-none text-center">
          <a href={social.github} className="btn btn-outline-light btn-sm">
            <i className="bi bi-github me-1"></i> Ver más proyectos
          </a>
        </div>
      </div>
    </section>
  )
}
