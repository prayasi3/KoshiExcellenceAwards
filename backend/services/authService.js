import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../config/jwt.js";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { requireValue, toPlain } from "./serviceUtils.js";

const toAuthUserResponse = (user) => {
  const data = toPlain(user);
  delete data.password_hash;
  return data;
};

const buildAuthResponse = (user) => {
  const accessToken = generateAccessToken(user);

  return {
    user: toAuthUserResponse(user),
    token: accessToken,
    accessToken,
    refreshToken: generateRefreshToken(user),
  };
};

export const registerUser = async ({ full_name, email, password }) => {
  requireValue(full_name, "Full name is required");
  requireValue(email, "Email is required");
  requireValue(password, "Password is required");

  const userCount = await User.count();

  if (userCount > 0) {
    throw new AppError(
      "Registration is disabled. Create users from an authenticated admin account.",
      403
    );
  }

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const password_hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    full_name,
    email,
    password_hash,
    role: "super_admin",
    status: "active",
  });

  return buildAuthResponse(user);
};

export const loginUser = async ({ email, password }) => {
  requireValue(email, "Email is required");
  requireValue(password, "Password is required");

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.status !== "active") {
    throw new AppError("User account is inactive", 403);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  await user.update({
    last_login: new Date(),
    updated_at: new Date(),
  });

  return buildAuthResponse(user);
};

export const refreshAuthToken = async ({ refreshToken, refresh_token }) => {
  const token = refreshToken || refresh_token;

  requireValue(token, "Refresh token is required");

  let decoded;

  try {
    decoded = verifyRefreshToken(token);
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }

  if (decoded.type !== "refresh") {
    throw new AppError("Invalid refresh token", 401);
  }

  const user = await User.findByPk(decoded.id);

  if (!user) {
    throw new AppError("User no longer exists", 401);
  }

  if (user.status !== "active") {
    throw new AppError("User account is inactive", 403);
  }

  return buildAuthResponse(user);
};

export const getCurrentUser = (user) => toPlain(user);
