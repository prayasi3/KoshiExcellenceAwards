import {
  createEditionRecord,
  deleteEditionRecord,
  getEdition,
  getEditions,
  updateEditionRecord,
} from "../services/editionService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getAllEditions = asyncHandler(async (req, res) => {
  const data = await getEditions(req.query);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const getEditionById = asyncHandler(async (req, res) => {
  const data = await getEdition(req.params.id);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const createEdition = asyncHandler(async (req, res) => {
  const data = await createEditionRecord(req.body);
  return sendSuccess(res, 201, "Created successfully", data);
});

export const updateEdition = asyncHandler(async (req, res) => {
  const data = await updateEditionRecord(req.params.id, req.body);
  return sendSuccess(res, 200, "Updated successfully", data);
});

export const deleteEdition = asyncHandler(async (req, res) => {
  await deleteEditionRecord(req.params.id);
  return sendSuccess(res, 200, "Deleted successfully");
});
