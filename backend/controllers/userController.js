import {
  createUserRecord,
  deleteUserRecord,
  getUser,
  getUsers,
  updateUserRecord,
} from "../services/userService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

// GET all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const data = await getUsers(req.query);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

// GET single user
export const getUserById = asyncHandler(async (req, res) => {
  const data = await getUser(req.params.id);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

// CREATE user
export const createUser = asyncHandler(async (req, res) => {
  const data = await createUserRecord(req.body);
  return sendSuccess(res, 201, "Created successfully", data);
});

// UPDATE user
export const updateUser = asyncHandler(async (req, res) => {
  const data = await updateUserRecord(req.params.id, req.body);
  return sendSuccess(res, 200, "Updated successfully", data);
});

// DELETE user
export const deleteUser = asyncHandler(async (req, res) => {
  await deleteUserRecord(req.params.id);
  return sendSuccess(res, 200, "Deleted successfully");
});
