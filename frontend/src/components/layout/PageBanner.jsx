import Container from "./Container";

export default function PageBanner({
  title,
  subtitle,
}) {
  return (
    <section className="bg-[#0B1F3A] py-24 text-white">
      <Container>
        <h1 className="text-5xl font-bold">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 max-w-2xl text-gray-300">
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}