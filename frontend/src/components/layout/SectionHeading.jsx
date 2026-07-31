export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
}) {
  const body = subtitle ?? description;

  return (
    <div className="mb-12 flex w-full flex-col items-center text-center">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C9A84C]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-2 font-heading text-4xl font-bold text-[#0B1F3A]">
        {title}
      </h2>

      {body && (
        <p className="mt-4 max-w-3xl text-center text-gray-600 leading-7">
          {body}
        </p>
      )}
    </div>
  );
}