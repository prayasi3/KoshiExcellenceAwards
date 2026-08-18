import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import HonoreeCard from "../components/honorees/HonoreeCard";
import { API_BASE_URL, extractItems, fetchJson, getHonoreeSlug } from "../lib/api";

export default function HonoreeDetail() {
  const { slug } = useParams();

  const [honoree, setHonoree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const payload = await fetchJson(`${API_BASE_URL}/honorees?limit=100`);
        if (ignore) return;

        const honorees = extractItems(payload);
        const match = honorees.find((item) => getHonoreeSlug(item) === slug);

        if (!match) {
          setError("We couldn't find this honoree.");
          setHonoree(null);
          return;
        }

        setHonoree(match);
      } catch {
        if (!ignore) {
          setError("We couldn't load this honoree. Please try again.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [slug]);

  const edition = honoree?.Edition || honoree?.edition;
  const editionLabel =
    edition?.title || (edition?.year ? `${edition.year} Edition` : "");

  return (
    <>
      <PageBanner
        title={honoree?.name || "Honoree"}
        subtitle={editionLabel}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Honorees", path: "/honorees" },
          { label: honoree?.name || "Honoree" },
        ]}
      />

      <Section className="bg-white">
        {loading ? (
          <div className="flex min-h-60 flex-col items-center justify-center gap-4 text-slate-600" role="status">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C9A84C]" />
            <span className="font-medium">Loading honoree...</span>
          </div>
        ) : error || !honoree ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <p className="text-slate-700">{error || "Honoree not found."}</p>
            <Link
              to="/honorees"
              className="mt-5 inline-flex rounded-full bg-[#0B1F3A] px-6 py-2.5 font-semibold text-white transition hover:bg-[#162D50]"
            >
              Back to Honorees
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left: title, name, address */}
            <div>
              <Link
                to="/honorees"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] transition hover:text-[#C9A84C]"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Honorees
              </Link>

              {honoree.recognition && (
                <span className="mt-6 block text-xs font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  {honoree.recognition}
                </span>
              )}

              <h2 className="mt-3 font-heading text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
                {honoree.name}
              </h2>

              {honoree.subtitle && (
                <p className="mt-2 text-lg font-medium text-slate-600">
                  {honoree.subtitle}
                </p>
              )}

              {honoree.address && (
                <div className="mt-4 flex items-start gap-2 text-slate-600">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#C9A84C]" aria-hidden="true" />
                  <span>{honoree.address}</span>
                </div>
              )}

              {honoree.description && (
                <p className="mt-6 leading-7 text-slate-600">{honoree.description}</p>
              )}
            </div>

            {/* Right: card */}
            <div className="mx-auto w-full max-w-sm">
              <HonoreeCard honoree={honoree} disableLink />
            </div>
          </div>
        )}
      </Section>
    </>
  );
}