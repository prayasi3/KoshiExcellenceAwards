import {
  createTeamRecord,
  deleteTeamRecord,
  getTeam,
  getTeams,
  updateTeamRecord,
} from "../services/teamService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getAllTeams = asyncHandler(async (req, res) => {
  const data = await getTeams(req.query);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const getTeamById = asyncHandler(async (req, res) => {
  const data = await getTeam(req.params.id);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const createTeam = asyncHandler(async (req, res) => {
  const data = await createTeamRecord(req.body);
  return sendSuccess(res, 201, "Created successfully", data);
});

export const updateTeam = asyncHandler(async (req, res) => {
  const data = await updateTeamRecord(req.params.id, req.body);
  return sendSuccess(res, 200, "Updated successfully", data);
});

export const deleteTeam = asyncHandler(async (req, res) => {
  await deleteTeamRecord(req.params.id);
  return sendSuccess(res, 200, "Deleted successfully");
});
