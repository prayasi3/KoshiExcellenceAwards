import {
  createHonoreeRecord,
  deleteHonoreeRecord,
  getHonoree,
  getHonorees,
  updateHonoreeRecord,
} from "../services/honoreeService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getAllHonorees = asyncHandler(async (req, res) => {
  const data = await getHonorees(req.query);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const getHonoreeById = asyncHandler(async (req, res) => {
  const data = await getHonoree(req.params.id);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const createHonoree = asyncHandler(async (req, res) => {
  const data = await createHonoreeRecord(req.body);
  return sendSuccess(res, 201, "Created successfully", data);
});

export const updateHonoree = asyncHandler(async (req, res) => {
  const data = await updateHonoreeRecord(req.params.id, req.body);
  return sendSuccess(res, 200, "Updated successfully", data);
});

export const deleteHonoree = asyncHandler(async (req, res) => {
  await deleteHonoreeRecord(req.params.id);
  return sendSuccess(res, 200, "Deleted successfully");
});
