import { useState } from "react";
import "./HeroAvatar.css";

import avifSrcSet from "../../assets/heroAvatarCombined.png?w=520;1040&format=avif&quality=45&as=srcset";
import webpSrcSet from "../../assets/heroAvatarCombined.png?w=520;1040&format=webp&quality=70&as=srcset";
import pngFallback from "../../assets/heroAvatarCombined.png?w=520&format=png&as=url";

export function HeroAvatar() {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    // pequeño delay para efecto cinematográfico
    setTimeout(() => setLoaded(true), 120);
  };

  return (
    <div className={`hero-avatar-wrapper ${loaded ? "is-loaded" : ""}`}>
      <picture>
        <source
          type="image/avif"
          srcSet={avifSrcSet}
          sizes="(max-width: 576px) 350px, 520px"
        />
        <source
          type="image/webp"
          srcSet={webpSrcSet}
          sizes="(max-width: 576px) 350px, 520px"
        />
        <img
          src={pngFallback}
          alt="Jose Carlos avatar"
          className="hero-avatar-image"
          width="520"
          height="520"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onLoad={handleLoad}
        />
      </picture>
    </div>
  );
}
