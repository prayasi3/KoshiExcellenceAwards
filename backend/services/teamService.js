import { Team } from "../models/Team.js";
import {
  hasBlankValue,
  pickFields,
  requireFound,
  requirePresent,
  requireValue,
} from "./serviceUtils.js";

const teamFields = [
  "full_name",
  "role",
  "designation",
  "photo_url",
  "bio",
  "display_order",
  "role_priority",
  "is_active",
  "created_at",
  "updated_at",
];

export const getTeams = async () =>
  Team.findAll({
    order: [
      ["role_priority", "ASC"],
      ["display_order", "ASC"],
    ],
  });

export const getTeam = async (id) =>
  requireFound(await Team.findByPk(id), "Team member not found");

export const createTeamRecord = async (body) => {
  const payload = pickFields(body, teamFields);

  requireValue(payload.full_name, "Full name is required");
  requireValue(payload.role, "Role is required");
  requirePresent(payload.role_priority, "Role priority is required");

  return Team.create(payload);
};

export const updateTeamRecord = async (id, body) => {
  const team = requireFound(await Team.findByPk(id), "Team member not found");
  const payload = pickFields(body, teamFields);

  if (payload.full_name !== undefined && hasBlankValue(payload.full_name)) {
    requireValue(payload.full_name, "Full name is required");
  }

  if (payload.role !== undefined && hasBlankValue(payload.role)) {
    requireValue(payload.role, "Role is required");
  }

  if (payload.role_priority !== undefined) {
    requirePresent(payload.role_priority, "Role priority is required");
  }

  await team.update({
    ...payload,
    updated_at: new Date(),
  });

  return team;
};

export const deleteTeamRecord = async (id) => {
  const team = requireFound(await Team.findByPk(id), "Team member not found");
  await team.destroy();
};
