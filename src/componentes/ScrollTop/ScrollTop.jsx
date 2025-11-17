import { useEffect, useState } from "react";
import "./ScrollTop.css";

export function ScrollTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-top-btn ${show ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <i className="bi bi-chevron-double-up"></i>
      <span className="tooltip">Scroll Top</span>
    </button>
  );
}
