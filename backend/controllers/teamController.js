import { Team } from "../models/Team.js";

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

const getTeamPayload = (body) => {
  const payload = {};

  teamFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  return payload;
};

const hasBlankValue = (value) => String(value ?? "").trim() === "";

// GET all team members
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      order: [
        ["role_priority", "ASC"],
        ["display_order", "ASC"],
      ],
    });

    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single team member
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team member not found" });
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE team member
export const createTeam = async (req, res) => {
  try {
    const payload = getTeamPayload(req.body);

    if (hasBlankValue(payload.full_name)) {
      return res.status(400).json({ message: "Full name is required" });
    }

    if (hasBlankValue(payload.role)) {
      return res.status(400).json({ message: "Role is required" });
    }

    if (payload.role_priority === undefined || payload.role_priority === null) {
      return res.status(400).json({ message: "Role priority is required" });
    }

    const team = await Team.create(payload);
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE team member
export const updateTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team member not found" });
    }

    const payload = getTeamPayload(req.body);

    if (payload.full_name !== undefined && hasBlankValue(payload.full_name)) {
      return res.status(400).json({ message: "Full name is required" });
    }

    if (payload.role !== undefined && hasBlankValue(payload.role)) {
      return res.status(400).json({ message: "Role is required" });
    }

    if (payload.role_priority !== undefined && payload.role_priority === null) {
      return res.status(400).json({ message: "Role priority is required" });
    }

    await team.update({
      ...payload,
      updated_at: new Date(),
    });

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE team member
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team member not found" });
    }

    await team.destroy();

    res.status(200).json({
      message: "Team member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
