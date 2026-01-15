import { useEffect, useState } from "react";
import { HeroAvatar } from "./HeroAvatar";
import "./Hero.css";

const HERO_ROLES = [
  "Full Stack Developer",
  "Frontend Developer (React.js)",
  "React, Bootstrap & CSS Lover",
  "Python & Flask Developer",
  "PostgreSQL & REST API Builder",
];

export function Hero({ social }) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    const current = HERO_ROLES[loopIndex % HERO_ROLES.length];
    const speed = isDeleting ? 75 : 145;

    const timeout = setTimeout(() => {
      const nextText = isDeleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);

      setText(nextText);

      if (!isDeleting && nextText === current) {
        setTimeout(() => setIsDeleting(true), 800);
      }

      if (isDeleting && nextText === "") {
        setIsDeleting(false);
        setLoopIndex((prev) => prev + 1);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, loopIndex]);

  return (
    <header id="home" className="hero-wrap">
      <div className="container">
        <div className="row align-items-center gy-5">
          {/* TEXTO */}
          <div className="col-12 col-lg-7">
            <div className="hero-text">
              <div className="hero-intro">
                <span className="hero-line" />
                <span className="hero-small">Hi, I&apos;m</span>
              </div>

              <h1 className="hero-title">
                <span className="hero-name">JoseC González,</span>
                <br />
                <span className="hero-typing-wrapper">
                  <span className="hero-typewriter hero-role">
                    {text}
                  </span>
                </span>
              </h1>

              <p className="hero-desc">
                Desarrollador <strong>full stack</strong> orientado al{" "}
                <strong>frontend</strong>. Me gusta crear interfaces limpias,
                rápidas y usables con React, conectadas a APIs en Flask pulidas
                y bien estructuradas.
              </p>

              <div className="hero-buttons">
                <a
                  href={social.cv}
                  className="btn btn-hero-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="bi bi-cloud-arrow-down me-2" />
                  Resume
                </a>

                <button
                  className="btn btn-hero-outline"
                  data-bs-toggle="modal"
                  data-bs-target="#contactModal"
                >
                  <i className="bi bi-envelope me-2" />
                  Contact Me
                </button>
              </div>

              <a href="#about" className="hero-scroll">
                <i className="bi bi-chevron-down" />
                <span>Scroll Down</span>
              </a>
            </div>
          </div>

          {/* AVATAR */}
          <div className="col-12 col-lg-5">
            <HeroAvatar />
          </div>
        </div>
      </div>
    </header>
  );
}
