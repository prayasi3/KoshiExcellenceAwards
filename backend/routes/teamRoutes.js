import express from "express";
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
} from "../controllers/teamController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { validateBody, validateParams } from "../middleware/validateMiddleware.js";
import { idParamSchema, teamSchemas } from "../validations/validationSchemas.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllTeams);
router.get("/:id", validateParams(idParamSchema), getTeamById);
router.post("/", requireAdmin, validateBody(teamSchemas.create), createTeam);
router.put(
  "/:id",
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(teamSchemas.update),
  updateTeam
);
router.delete("/:id", requireAdmin, validateParams(idParamSchema), deleteTeam);

export const teamRoutes = router;
