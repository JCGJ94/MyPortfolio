import { useState } from "react";
import avatar from "../../assets/heroAvatarCombined.svg";
import "./HeroAvatar.css";

export function HeroAvatar() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`hero-avatar-wrapper ${loaded ? "is-loaded" : ""}`}>
      <img
        src={avatar}
        alt="Jose Carlos avatar"
        className="hero-avatar-image"
        width="520"
        height="520"
        loading="eager"
        decoding="async"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
