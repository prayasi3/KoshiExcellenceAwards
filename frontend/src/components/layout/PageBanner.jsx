import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Container from "./Container";

export default function PageBanner({
  title,
  subtitle,
  breadcrumbs,
  cta,
}) {
  return (
    <section className="relative overflow-hidden bg-[#0B1F3A] py-24 text-white">
      {/* Radial gold accent, per brand spec */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 90% at 85% 0%, rgba(201,168,76,0.35) 0%, rgba(201,168,76,0) 60%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-gray-300" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight size={14} className="text-gray-500" aria-hidden="true" />}
                {crumb.path ? (
                  <Link to={crumb.path} className="transition hover:text-[#C9A84C]">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-[#C9A84C]">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="font-heading text-4xl font-bold sm:text-5xl">{title}</h1>

        {subtitle && (
          <p className="mt-4 max-w-2xl text-gray-300 leading-7">{subtitle}</p>
        )}

        {cta && (
          <Link
            to={cta.to}
            className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-[#C9A84C] bg-[#C9A84C] px-7 py-3 font-semibold text-[#0B1F3A] transition hover:-translate-y-0.5 hover:bg-transparent hover:text-[#C9A84C]"
          >
            {cta.label}
          </Link>
        )}
      </Container>
    </section>
  );
}
