import {
  createSpeakerRecord,
  deleteSpeakerRecord,
  getSpeaker,
  getSpeakers,
  updateSpeakerRecord,
} from "../services/speakerService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getAllSpeakers = asyncHandler(async (req, res) => {
  const data = await getSpeakers(req.query);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const getSpeakerById = asyncHandler(async (req, res) => {
  const data = await getSpeaker(req.params.id);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const createSpeaker = asyncHandler(async (req, res) => {
  const data = await createSpeakerRecord(req.body);
  return sendSuccess(res, 201, "Created successfully", data);
});

export const updateSpeaker = asyncHandler(async (req, res) => {
  const data = await updateSpeakerRecord(req.params.id, req.body);
  return sendSuccess(res, 200, "Updated successfully", data);
});

export const deleteSpeaker = asyncHandler(async (req, res) => {
  await deleteSpeakerRecord(req.params.id);
  return sendSuccess(res, 200, "Deleted successfully");
});
