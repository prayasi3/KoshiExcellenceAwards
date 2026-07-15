export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}) {
  return (
    <div
      className={`mb-12 ${
        center ? "text-center" : ""
      }`}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-2 text-4xl font-bold text-[#0B1F3A]">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 max-w-3xl text-gray-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}