import { useState } from "react";

import {
  getFacebookEmbedUrl,
  isFacebookEmbedUrl,
} from "../../lib/media";

export default function FacebookMedia({
  src,
  alt,
  className,
  onError,
  placeholder = null,
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return placeholder;
  }

  if (isFacebookEmbedUrl(src)) {
    return (
      <iframe
        title={alt ? `Facebook embed for ${alt}` : "Facebook embed"}
        src={getFacebookEmbedUrl(src)}
        className={className}
        style={{ border: "none" }}
        scrolling="no"
        allowFullScreen
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(event) => {
        setFailed(true);
        if (typeof onError === "function") {
          onError(event);
        }
      }}
    />
  );
}
