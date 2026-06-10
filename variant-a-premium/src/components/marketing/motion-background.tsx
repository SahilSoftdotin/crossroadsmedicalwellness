/**
 * Slow-drifting aurora/gradient motion background. Pure CSS (see globals.css),
 * GPU-friendly, and automatically stilled for users with prefers-reduced-motion.
 * Render inside a `relative` + `overflow-hidden` parent.
 */
export function MotionBackground({ soft = false }: { soft?: boolean }) {
  return (
    <div className={`aurora${soft ? " aurora--soft" : ""}`} aria-hidden="true">
      <span className="aurora-blob aurora-blob--1" />
      <span className="aurora-blob aurora-blob--2" />
      <span className="aurora-blob aurora-blob--3" />
    </div>
  );
}
