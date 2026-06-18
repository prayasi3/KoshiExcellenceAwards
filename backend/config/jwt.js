import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return process.env.JWT_SECRET;
};

const getJwtRefreshSecret = () => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not configured");
  }

  return process.env.JWT_REFRESH_SECRET;
};

export const generateAccessToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      role: user.role,
      status: user.status,
      type: "access",
    },
    getJwtSecret(),
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    }
  );

export const generateRefreshToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      type: "refresh",
    },
    getJwtRefreshSecret(),
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    }
  );

export const generateToken = generateAccessToken;

export const verifyToken = (token) => jwt.verify(token, getJwtSecret());

export const verifyRefreshToken = (token) =>
  jwt.verify(token, getJwtRefreshSecret());
