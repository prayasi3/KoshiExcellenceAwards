import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed looping hero video. Falls back to a static poster image if the
 * video fails to load, or if the visitor has "reduce motion" turned on at
 * the OS/browser level (autoplaying video can be disorienting for them).
 */
export default function HeroVideo({ src, poster }) {
  const videoRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const showVideo = !videoFailed && !reducedMotion;

  return (
    <div className="absolute inset-0">
      {showVideo ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={(event) => {
            const mediaError = event.currentTarget.error;
            console.error(
              "Hero video failed to load:",
              mediaError?.message || mediaError,
              { src }
            );
            setVideoFailed(true);
          }}
        />
      ) : (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}