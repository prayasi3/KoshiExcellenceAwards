import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

const userFields = [
  "full_name",
  "email",
  "password_hash",
  "role",
  "status",
  "last_login",
  "created_at",
  "updated_at",
];

const getUserPayload = async (body) => {
  const payload = {};

  userFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  if (body.password !== undefined) {
    payload.password_hash = await bcrypt.hash(body.password, 10);
  }

  return payload;
};

const hasBlankValue = (value) => String(value ?? "").trim() === "";

const toUserResponse = (user) => {
  const data = user.toJSON();
  delete data.password_hash;
  return data;
};

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password_hash"] },
      order: [["created_at", "DESC"]],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE user
export const createUser = async (req, res) => {
  try {
    const payload = await getUserPayload(req.body);

    if (hasBlankValue(payload.full_name)) {
      return res.status(400).json({ message: "Full name is required" });
    }

    if (hasBlankValue(payload.email)) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (hasBlankValue(payload.password_hash)) {
      return res.status(400).json({ message: "Password is required" });
    }

    const user = await User.create(payload);
    res.status(201).json(toUserResponse(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const payload = await getUserPayload(req.body);

    if (payload.full_name !== undefined && hasBlankValue(payload.full_name)) {
      return res.status(400).json({ message: "Full name is required" });
    }

    if (payload.email !== undefined && hasBlankValue(payload.email)) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (
      payload.password_hash !== undefined &&
      hasBlankValue(payload.password_hash)
    ) {
      return res.status(400).json({ message: "Password is required" });
    }

    await user.update({
      ...payload,
      updated_at: new Date(),
    });

    res.status(200).json(toUserResponse(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
