import express from "express";
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
} from "../controllers/teamController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllTeams);
router.get("/:id", getTeamById);
router.post("/", requireAdmin, createTeam);
router.put("/:id", requireAdmin, updateTeam);
router.delete("/:id", requireAdmin, deleteTeam);

export const teamRoutes = router;
