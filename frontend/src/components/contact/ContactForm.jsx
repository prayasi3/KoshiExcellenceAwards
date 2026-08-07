import { useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, Send, TriangleAlert } from "lucide-react";
import { postJson } from "../../lib/api";

const initialForm = { full_name: "", email: "", phone: "", subject: "", message: "" };

// TODO: replace with your organisation's real WhatsApp number, in full
// international format with digits only — no "+", spaces, or leading 0.
// e.g. Nepal number 98X-XXX-XXXX with country code 977 becomes "9779800000000"
const WHATSAPP_NUMBER = "9779824307546";

function buildWhatsAppMessage(form) {
  const lines = [
    "New message from the Koshi Excellence Award website:",
    "",
    `Name: ${form.full_name}`,
    `Email: ${form.email}`,
    form.phone ? `Phone: ${form.phone}` : null,
    form.subject ? `Subject: ${form.subject}` : null,
    "",
    `Message: ${form.message}`,
  ].filter(Boolean);

  return lines.join("\n");
}

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [whatsappBlocked, setWhatsappBlocked] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.full_name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    const text = encodeURIComponent(buildWhatsAppMessage(form));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    setWhatsappUrl(url);

    // Open the WhatsApp tab *synchronously*, before any await — browsers
    // treat a window.open() called after an async gap as a popup and block
    // it, since it no longer looks like a direct response to the click.
    const waWindow = window.open(url, "_blank");
    setWhatsappBlocked(!waWindow);
    if (waWindow) {
      waWindow.location.href = url;
      setWhatsappBlocked(false);
    } else {
      // Popup blocked — we'll show a manual "Open WhatsApp" button instead.
      setWhatsappBlocked(true);
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Save a record for the admin dashboard. This runs after WhatsApp has
      // already opened, so a slow/failed save never delays the redirect.
      await postJson("/contacts", form);
      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error.message ||
          "WhatsApp opened, but we couldn't save a copy of your message. Please still send it on WhatsApp."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto text-emerald-600" size={40} aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-[#0B1F3A]">
          {whatsappBlocked ? "Almost there" : "WhatsApp opened"}
        </h3>
        <p className="mt-2 text-slate-600">
          {whatsappBlocked
            ? "Your message was saved. Tap the button below to send it on WhatsApp."
            : "We've opened WhatsApp with your message ready to send. A copy was also saved for our team."}
        </p>

        {whatsappBlocked && whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 font-semibold text-white transition hover:brightness-95"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Open WhatsApp
          </a>
        )}

        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setWhatsappBlocked(false);
          }}
          className="mt-6 block w-full text-sm font-semibold text-[#0B1F3A] underline underline-offset-2 sm:inline sm:w-auto sm:ml-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="full_name" className="mb-1.5 block text-sm font-semibold text-[#0B1F3A]">
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/30"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[#0B1F3A]">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/30"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-[#0B1F3A]">
            Phone <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="98XXXXXXXX"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/30"
          />
        </div>

        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-semibold text-[#0B1F3A]">
            Subject <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/30"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-[#0B1F3A]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help..."
          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/30"
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden="true" />
            Opening WhatsApp...
          </>
        ) : (
          <>
            <MessageCircle size={18} aria-hidden="true" />
            Send via WhatsApp
          </>
        )}
      </button>

      <p className="flex items-center gap-1.5 text-xs text-slate-400">
        <Send size={12} aria-hidden="true" />
        This opens WhatsApp with your message ready to send, and also saves a
        copy for our team.
      </p>
    </form>
  );
}