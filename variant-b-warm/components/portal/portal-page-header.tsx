export function PortalPageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="font-display text-2xl font-extrabold text-brown sm:text-3xl">
        {title}
      </h1>
      {description && (
        <p className="mt-1.5 max-w-2xl text-sm text-brown-soft sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
