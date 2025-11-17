
import "./WaveDivider.css"

export function WaveDivider({ from = "var(--bg-main)", to = "#f8f9fa" }) {
  return (
    <div
      className="wave-divider"
      style={{ background: from }} 
    >
      <svg
        className="wave-divider-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill={to} 
          fillOpacity="1"
          d="M0,160 C360,240 720,80 1080,160 C1440,240 1800,80 2160,160 L2160,320 L0,320 Z"
        >
          <animate
            attributeName="d"
            dur="3s"
            repeatCount="indefinite"
            values="
              M0,160 C360,240 720,80 1080,160 C1440,240 1800,80 2160,160 L2160,320 L0,320 Z;
              M0,160 C360,80 720,240 1080,160 C1440,80 1800,240 2160,160 L2160,320 L0,320 Z;
              M0,160 C360,240 720,80 1080,160 C1440,240 1800,80 2160,160 L2160,320 L0,320 Z
            "
          />
        </path>
      </svg>
    </div>
  )
}
