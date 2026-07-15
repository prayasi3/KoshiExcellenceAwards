import Container from "./Container";

export default function Section({
  children,
  className = "",
  id,
}) {
  return (
    <section
      id={id}
      className={`py-20 ${className}`}
    >
      <Container>
        {children}
      </Container>
    </section>
  );
}