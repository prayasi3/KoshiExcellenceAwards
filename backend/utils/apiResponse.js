const MEDIA_URL_KEYS = new Set([
  "image_url",
  "photo_url",
  "media_url",
  "logo_url",
  "featured_image",
  "poster_url",
  "thumbnail_url",
]);

const LOCALHOST_URL_REGEX = /^https?:\/\/localhost(:5000)?(\/.*)?$/i;
const LOCALHOST_IP_REGEX = /^https?:\/\/127\.0\.0\.1(:5000)?(\/.*)?$/i;
const LOCALHOST_HOSTNAME_REGEX = /^(localhost|127\.0\.0\.1)(:5000)?(\/.*)?$/i;

const normalizeMediaUrl = (value, req) => {
  if (typeof value !== "string" || !req) return value;

  const currentHost = `${req.protocol}://${req.get("host")}`;

  if (LOCALHOST_URL_REGEX.test(value) || LOCALHOST_IP_REGEX.test(value)) {
    return value
      .replace(/https?:\/\/localhost(:5000)?/, currentHost)
      .replace(/https?:\/\/127\.0\.0\.1(:5000)?/, currentHost);
  }

  if (LOCALHOST_HOSTNAME_REGEX.test(value)) {
    return value.replace(LOCALHOST_HOSTNAME_REGEX, (match, host, port, path = "") => `${currentHost}${path}`);
  }

  if (value.startsWith("/uploads")) {
    return `${currentHost}${value}`;
  }

  if (value.startsWith("uploads/")) {
    return `${currentHost}/${value}`;
  }

  return value;
};

const normalizeData = (data, req) => {
  if (data === null || data === undefined) return data;

  // Sequelize model instances must be converted before walking their fields.
  // Serialising the instance directly exposes its internal `dataValues` object,
  // which leaves API consumers without fields such as `id` and `slug`.
  if (typeof data?.toJSON === "function") {
    return normalizeData(data.toJSON(), req);
  }

  if (Array.isArray(data)) {
    return data.map((item) => normalizeData(item, req));
  }

  if (typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => {
        if (MEDIA_URL_KEYS.has(key) && typeof value === "string") {
          return [key, normalizeMediaUrl(value, req)];
        }

        return [key, normalizeData(value, req)];
      })
    );
  }

  return data;
};

export const sendSuccess = (res, statusCode, message, data = null) => {
  const normalizedData = normalizeData(data, res?.req);

  return res.status(statusCode).json({
    success: true,
    message,
    data: normalizedData,
  });
};

export { normalizeData };
