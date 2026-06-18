import { AppError } from "../utils/AppError.js";

export const hasBlankValue = (value) => String(value ?? "").trim() === "";

export const pickFields = (body, fields) => {
  const payload = {};

  fields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  return payload;
};

export const requireValue = (value, message) => {
  if (hasBlankValue(value)) {
    throw new AppError(message, 400);
  }
};

export const requirePresent = (value, message) => {
  if (value === undefined || value === null || value === "") {
    throw new AppError(message, 400);
  }
};

export const requireFound = (record, message) => {
  if (!record) {
    throw new AppError(message, 404);
  }

  return record;
};

export const toPlain = (record) =>
  typeof record?.toJSON === "function" ? record.toJSON() : record;
