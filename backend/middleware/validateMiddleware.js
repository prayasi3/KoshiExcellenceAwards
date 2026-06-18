import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";

const formatZodErrors = (error) =>
  error.issues
    .map((issue) => `${issue.path.join(".") || "body"}: ${issue.message}`)
    .join(", ");

const validate = (source) => (schema) => (req, res, next) => {
  try {
    req[source] = schema.parse(req[source]);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return next(new AppError(formatZodErrors(error), 400));
    }

    next(error);
  }
};

export const validateBody = validate("body");

export const validateParams = validate("params");
