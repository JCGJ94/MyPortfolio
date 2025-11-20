import React, { useState, useEffect, useRef } from 'react'
import './Navbar.css'

export function Navbar({ social }) {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef(null)
  const togglerRef = useRef(null)

  // Cerrar al hacer clic fuera del nav (solo en móvil)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth >= 992) return // solo móvil/tablet

      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(e.target) &&
        togglerRef.current &&
        !togglerRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  const handleNavClick = () => {
    if (window.innerWidth < 992) {
      setIsOpen(false)
    }
  }

  const handleTogglerClick = () => {
    if (window.innerWidth < 992) {
      setIsOpen((prev) => !prev)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-fixed bg-gradient-1 fixed-top shadow-sm">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#home">
          <span className="brand-flag">JC</span>
          <span className="brand-text">CODE</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          onClick={handleTogglerClick}
          aria-controls="nav"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
          ref={togglerRef}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          id="nav"
          ref={navRef}
          className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <a className="nav-link" href="#skills" onClick={handleNavClick}>
                Stack
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects" onClick={handleNavClick}>
                Proyectos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#certs" onClick={handleNavClick}>
                Certif./Formación
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={handleNavClick}>
                Contacto
              </a>
            </li>
            <li className="nav-item ms-lg-3">
              <a
                href={social.cv}
                className="btn btn-hero-primary"
                target="_blank"
                rel="noreferrer"
                onClick={handleNavClick}
              >
                <i className="bi bi-cloud-arrow-down me-2" />
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
