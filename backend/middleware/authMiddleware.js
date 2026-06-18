import { verifyToken } from "../config/jwt.js";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";

const getBearerToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1];
};

export const protect = async (req, res, next) => {
  try {
    const token = getBearerToken(req);

    if (!token) {
      throw new AppError("Authentication token missing", 401);
    }

    let decoded;

    try {
      decoded = verifyToken(token);
    } catch (err) {
      throw new AppError("Invalid token format", 401);
    }

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      throw new AppError("User no longer exists", 401);
    }

    if (user.status !== "active") {
      throw new AppError("User account is inactive", 403);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Authentication required", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Access denied", 403));
    }

    next();
  };
