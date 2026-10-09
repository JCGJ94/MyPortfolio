// Decorative blue segment that travels around the navbar border. Pure SVG + CSS
// (see `.portfolio-nav__trace` in globals.css): no JS, no layout, hidden under reduced motion.
export function NavTrace() {
  return (
    <svg className="portfolio-nav__trace" aria-hidden="true" focusable="false">
      <rect pathLength={1} />
    </svg>
  );
}
