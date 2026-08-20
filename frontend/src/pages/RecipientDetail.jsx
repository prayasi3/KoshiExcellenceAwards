import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

import PageBanner from "../components/layout/PageBanner";
import Section from "../components/layout/Section";
import RecipientCard from "../components/recipients/RecipientCard";
import { API_BASE_URL, extractItems, fetchJson, getRecipientSlug } from "../lib/api";

export default function RecipientDetail() {
  const { slug } = useParams();

  const [recipient, setRecipient] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const [recipientsPayload, categoryPayload] = await Promise.all([
          fetchJson(`${API_BASE_URL}/recipients?limit=100`),
          fetchJson(`${API_BASE_URL}/categories?limit=100`),
        ]);

        if (ignore) return;

        const recipients = extractItems(recipientsPayload);
        const match = recipients.find(
          (item) => getRecipientSlug(item) === slug
        );

        if (!match) {
          setError("We couldn't find this recipient.");
          setRecipient(null);
          return;
        }

        setRecipient(match);

        const categories = extractItems(categoryPayload);
        const categoryMatch = categories.find(
          (category) => Number(category.id) === Number(match.category_id)
        );
        setCategoryName(categoryMatch?.category_name || "");
      } catch {
        if (!ignore) {
          setError("We couldn't load this recipient. Please try again.");
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

  const edition = recipient?.Edition || recipient?.edition;
  const editionLabel =
    edition?.title || (edition?.year ? `${edition.year} Edition` : "");

  return (
    <>
      <Section className="bg-white">
        {loading ? (
          <div className="flex min-h-60 flex-col items-center justify-center gap-4 text-slate-600" role="status">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#C9A84C]" />
            <span className="font-medium">Loading recipient...</span>
          </div>
        ) : error || !recipient ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center">
            <p className="text-slate-700">{error || "Recipient not found."}</p>
            <Link
              to="/recipients"
              className="mt-5 inline-flex rounded-full bg-[#0B1F3A] px-6 py-2.5 font-semibold text-white transition hover:bg-[#162D50]"
            >
              Back to Awarded
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            {/* Left: title, name, address */}
            <div>
              <Link
                to="/recipients"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B1F3A] transition hover:text-[#C9A84C]"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back to Awarded
              </Link>

              {categoryName && (
                <span className="mt-6 block text-xs font-bold uppercase tracking-[0.18em] text-[#C9A84C]">
                  {categoryName}
                </span>
              )}

              <h2 className="mt-3 font-heading text-3xl font-bold text-[#0B1F3A] sm:text-4xl">
                {recipient.full_name}
              </h2>

              {recipient.title && (
                <p className="mt-2 text-lg font-medium text-slate-600">
                  {recipient.title}
                </p>
              )}

              {recipient.address && (
                <div className="mt-4 flex items-start gap-2 text-slate-600">
                  <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#C9A84C]" aria-hidden="true" />
                  <span>{recipient.address}</span>
                </div>
              )}

              {recipient.bio && (
                <p className="mt-6 leading-7 text-slate-600">{recipient.bio}</p>
              )}
            </div>

            {/* Right: card */}
            <div className="mx-auto w-full max-w-sm">
              <RecipientCard recipient={recipient} categoryName={categoryName} disableLink />
            </div>
          </div>
        )}
      </Section>
    </>
  );
}