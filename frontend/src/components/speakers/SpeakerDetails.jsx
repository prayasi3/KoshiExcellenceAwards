import { Link } from "react-router-dom";

export default function SpeakerDetails({ speaker }) {
  if (!speaker) return null;

  return (
    <div className="mx-auto max-w-6xl py-12">
      <Link
        to="/speakers"
        className="mb-8 inline-block text-[#C9A84C] hover:underline"
      >
        ← Back to Speakers
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <img
            src={
              speaker.image_url ||
              "https://placehold.co/600x700?text=Speaker"
            }
            alt={speaker.name}
            className="w-full rounded-2xl object-cover shadow-lg"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-[#0B1F3A]">
            {speaker.name}
          </h1>

          <p className="mt-3 text-xl text-[#C9A84C]">
            {speaker.designation}
          </p>

          {speaker.organization && (
            <p className="mt-2 text-lg text-gray-600">
              {speaker.organization}
            </p>
          )}

          {speaker.bio && (
            <div className="mt-8">
              <h2 className="mb-3 text-2xl font-semibold text-[#0B1F3A]">
                Biography
              </h2>

              <p className="leading-8 text-gray-700">
                {speaker.bio}
              </p>
            </div>
          )}

          {speaker.linkedin_url && (
            <a
              href={speaker.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-lg bg-[#0B1F3A] px-6 py-3 text-white transition hover:bg-[#132C52]"
            >
              View LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}