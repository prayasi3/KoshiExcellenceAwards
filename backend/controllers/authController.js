import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../services/authService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

// REGISTER user
export const register = asyncHandler(async (req, res) => {
  const data = await registerUser(req.body);
  return sendSuccess(res, 201, "Registered successfully", data);
});

// LOGIN user
export const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body);
  return sendSuccess(res, 200, "Logged in successfully", data);
});

// GET current authenticated user
export const getMe = asyncHandler(async (req, res) => {
  return sendSuccess(res, 200, "Fetched successfully", getCurrentUser(req.user));
});
