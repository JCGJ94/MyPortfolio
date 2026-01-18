import { useState, useEffect, useRef } from "react";
import "./HeroAvatar.css";

export function HeroAvatar() {
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    // Cargar la imagen en un chunk separado para evitar bloquear el bundle inicial
    import("../../assets/heroAvatarCombined.svg")
      .then((m) => {
        if (mounted) setSrc(m.default || m);
      })
      .catch(() => {
        if (mounted) setSrc(null);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={`hero-avatar-wrapper ${loaded ? "is-loaded" : ""}`}>
      {!src && (
        <div className="hero-avatar-placeholder" aria-hidden="true" />
      )}

      {src && (
        <img
          ref={imgRef}
          src={src}
          alt="Jose Carlos avatar"
          className="hero-avatar-image"
          width="520"
          height="520"
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
