import "./Footer.css"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-fixed py-4 text-center small">
      <div className="container">
        <p className="mb-1 footer-text">
          © {year}{' '}
          <span className="footer-brand">JC-CODE</span> ➡️{' '}
          <span className="footer-name">Jose C. Gonzalez</span>
        </p>
        <p className="mb-0 footer-tech">
          Hecho con <span>React</span> + <span>Bootstrap</span> + <span>CSS</span>
        </p>
      </div>
    </footer>
  )
}
