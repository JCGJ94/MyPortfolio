// Editorial section marker: "02 — Proyectos ——— meta". Decorative index, real text label.
export function SectionLabel({ index, label, meta }: { index: string; label: string; meta?: string }) {
  return (
    <p className="pv3-label">
      <span className="pv3-label__n" aria-hidden="true">{index}</span>
      <span className="pv3-label__t">{label}</span>
      <span className="pv3-label__rule" aria-hidden="true" />
      {meta && <span className="pv3-label__meta">{meta}</span>}
    </p>
  );
}
