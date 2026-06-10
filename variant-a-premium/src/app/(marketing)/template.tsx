/**
 * Marketing route-group template. Next.js re-mounts templates on every
 * navigation, so this plays a smooth entrance animation on each page change.
 * The animation is disabled for prefers-reduced-motion users (see globals.css).
 */
export default function MarketingTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="page-transition">{children}</div>;
}
