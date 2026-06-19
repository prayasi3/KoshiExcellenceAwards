import {
  createSponsorRecord,
  deleteSponsorRecord,
  getSponsor,
  getSponsors,
  updateSponsorRecord,
} from "../services/sponsorService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getAllSponsors = asyncHandler(async (req, res) => {
  const data = await getSponsors(req.query);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const getSponsorById = asyncHandler(async (req, res) => {
  const data = await getSponsor(req.params.id);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const createSponsor = asyncHandler(async (req, res) => {
  const data = await createSponsorRecord(req.body);
  return sendSuccess(res, 201, "Created successfully", data);
});

export const updateSponsor = asyncHandler(async (req, res) => {
  const data = await updateSponsorRecord(req.params.id, req.body);
  return sendSuccess(res, 200, "Updated successfully", data);
});

export const deleteSponsor = asyncHandler(async (req, res) => {
  await deleteSponsorRecord(req.params.id);
  return sendSuccess(res, 200, "Deleted successfully");
});
