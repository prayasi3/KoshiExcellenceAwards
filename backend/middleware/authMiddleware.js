import { verifyToken } from "../config/jwt.js";
import { User } from "../models/User.js";

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
      return res.status(401).json({ message: "Authentication token missing" });
    }

    let decoded;

      try {
        decoded = verifyToken(token);
      } catch (err) {
        return res.status(401).json({ message: "Invalid token format" });
      }
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "User account is inactive" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
