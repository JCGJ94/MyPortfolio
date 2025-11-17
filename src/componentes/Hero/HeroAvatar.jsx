import heroAvatarCombined from "../../assets/heroAvatarCombined.png";
import "./HeroAvatar.css";

export function HeroAvatar() {
  return (
    <div className="hero-avatar-wrapper">
      <img
        src={heroAvatarCombined}
        alt="Jose Carlos avatar"
        className="hero-avatar-image"
      />
    </div>
  );
}
