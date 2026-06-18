import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";
import { User } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { requireValue, toPlain } from "./serviceUtils.js";

const toAuthUserResponse = (user) => {
  const data = toPlain(user);
  delete data.password_hash;
  return data;
};

const buildAuthResponse = (user) => ({
  user: toAuthUserResponse(user),
  token: generateToken(user),
});

export const registerUser = async ({ full_name, email, password }) => {
  requireValue(full_name, "Full name is required");
  requireValue(email, "Email is required");
  requireValue(password, "Password is required");

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const password_hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    full_name,
    email,
    password_hash,
    role: "admin",
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

export const getCurrentUser = (user) => toPlain(user);
