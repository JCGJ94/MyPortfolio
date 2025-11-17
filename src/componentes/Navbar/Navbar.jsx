import React, { useEffect } from 'react'
import './Navbar.css'
import Collapse from 'bootstrap/js/dist/collapse'

export function Navbar({ social }) {

    useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const navbarCollapse = document.getElementById("nav");

    const handleClickOutside = (e) => {
      if (
        window.innerWidth < 992 &&
        navbarCollapse.classList.contains("show") &&
        !navbar.contains(e.target)
      ) {
        const bsCollapse =
          Collapse.getInstance(navbarCollapse) ||
          new Collapse(navbarCollapse, { toggle: false });
        bsCollapse.hide();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


    const handleNavClick = () => {
    if (window.innerWidth < 992) {    
      const navbarCollapse = document.getElementById('nav')
      if (!navbarCollapse) return

      const bsCollapse = Collapse.getInstance(navbarCollapse) 
        || new Collapse(navbarCollapse, { toggle: false })

      bsCollapse.hide()
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
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div id="nav" className="collapse navbar-collapse">
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
                rel="noreferrer" onClick={handleNavClick}
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
