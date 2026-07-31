import { Clock, Mail, MapPin, Phone } from "lucide-react";

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: "Venue",
    value: "Soaltee Westend, Itahari",
    note: "Koshi Province, Nepal",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@koshiexcellenceaward.com",
    href: "mailto:info@koshiexcellenceaward.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+977-1-4000000",
    href: "tel:+97714000000",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Sun – Fri, 10 AM – 5 PM",
    note: "Nepal Standard Time",
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-4">
      {CONTACT_DETAILS.map((item) => {
        const content = (
          <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5ECD0] text-[#0B1F3A]">
              <item.icon size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {item.label}
              </p>
              <p className="mt-1 font-semibold text-[#0B1F3A]">{item.value}</p>
              {item.note && <p className="text-sm text-slate-500">{item.note}</p>}
            </div>
          </div>
        );

        return item.href ? (
          <a key={item.label} href={item.href} className="block">
            {content}
          </a>
        ) : (
          <div key={item.label}>{content}</div>
        );
      })}
    </div>
  );
}