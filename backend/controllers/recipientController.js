import {
  createRecipientRecord,
  deleteRecipientRecord,
  getRecipient,
  getRecipients,
  updateRecipientRecord,
} from "../services/recipientService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getAllRecipients = asyncHandler(async (req, res) => {
  const data = await getRecipients(req.query);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const getRecipientById = asyncHandler(async (req, res) => {
  const data = await getRecipient(req.params.id);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const createRecipient = asyncHandler(async (req, res) => {
  const data = await createRecipientRecord(req.body);
  return sendSuccess(res, 201, "Created successfully", data);
});

export const updateRecipient = asyncHandler(async (req, res) => {
  const data = await updateRecipientRecord(req.params.id, req.body);
  return sendSuccess(res, 200, "Updated successfully", data);
});

export const deleteRecipient = asyncHandler(async (req, res) => {
  await deleteRecipientRecord(req.params.id);
  return sendSuccess(res, 200, "Deleted successfully");
});
