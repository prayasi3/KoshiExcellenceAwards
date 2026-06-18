export const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    data: null,
  });
};

const getSequelizeErrorMessage = (err) => {
  if (Array.isArray(err.errors) && err.errors.length > 0) {
    return err.errors.map((error) => error.message).join(", ");
  }

  return err.message;
};

const normalizeError = (err) => {
  if (err.statusCode) {
    return err;
  }

  if (err.name === "SequelizeValidationError") {
    err.statusCode = 400;
    err.message = getSequelizeErrorMessage(err);
    err.isOperational = true;
    return err;
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    err.statusCode = 409;
    err.message = getSequelizeErrorMessage(err);
    err.isOperational = true;
    return err;
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    err.statusCode = 401;
    err.message = "Invalid or expired token";
    err.isOperational = true;
    return err;
  }

  return err;
};

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const error = normalizeError(err);
  const statusCode = error.statusCode || 500;
  const message =
    error.isOperational || process.env.NODE_ENV !== "production"
      ? error.message
      : "Internal Server Error";

  if (!error.isOperational) {
    console.error(error.stack);
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
  });
};
