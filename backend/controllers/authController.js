import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";
import { User } from "../models/User.js";

const hasBlankValue = (value) => String(value ?? "").trim() === "";

const toAuthUserResponse = (user) => {
  const data = user.toJSON();
  delete data.password_hash;
  return data;
};

const buildAuthResponse = (user) => ({
  user: toAuthUserResponse(user),
  token: generateToken(user),
});

// REGISTER user
export const register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (hasBlankValue(full_name)) {
      return res.status(400).json({ message: "Full name is required" });
    }

    if (hasBlankValue(email)) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (hasBlankValue(password)) {
      return res.status(400).json({ message: "Password is required" });
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      full_name,
      email,
      password_hash,
      role: "admin",
      status: "active",
    });

    res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (hasBlankValue(email)) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (hasBlankValue(password)) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "User account is inactive" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    await user.update({
      last_login: new Date(),
      updated_at: new Date(),
    });

    res.status(200).json(buildAuthResponse(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET current authenticated user
export const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
