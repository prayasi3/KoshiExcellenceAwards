import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import {
  hasBlankValue,
  pickFields,
  requireFound,
  requireValue,
  toPlain,
} from "./serviceUtils.js";

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
  const payload = pickFields(body, userFields);

  if (body.password !== undefined) {
    requireValue(body.password, "Password is required");
    payload.password_hash = await bcrypt.hash(body.password, 10);
  }

  return payload;
};

const toUserResponse = (user) => {
  const data = toPlain(user);
  delete data.password_hash;
  return data;
};

export const getUsers = async () => {
  return User.findAll({
    attributes: { exclude: ["password_hash"] },
    order: [["created_at", "DESC"]],
  });
};

export const getUser = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password_hash"] },
  });

  return requireFound(user, "User not found");
};

export const createUserRecord = async (body) => {
  const payload = await getUserPayload(body);

  requireValue(payload.full_name, "Full name is required");
  requireValue(payload.email, "Email is required");
  requireValue(payload.password_hash, "Password is required");

  const user = await User.create(payload);
  return toUserResponse(user);
};

export const updateUserRecord = async (id, body) => {
  const user = requireFound(await User.findByPk(id), "User not found");
  const payload = await getUserPayload(body);

  if (payload.full_name !== undefined && hasBlankValue(payload.full_name)) {
    requireValue(payload.full_name, "Full name is required");
  }

  if (payload.email !== undefined && hasBlankValue(payload.email)) {
    requireValue(payload.email, "Email is required");
  }

  if (payload.password_hash !== undefined && hasBlankValue(payload.password_hash)) {
    requireValue(payload.password_hash, "Password is required");
  }

  await user.update({
    ...payload,
    updated_at: new Date(),
  });

  return toUserResponse(user);
};

export const deleteUserRecord = async (id) => {
  const user = requireFound(await User.findByPk(id), "User not found");
  await user.destroy();
};
