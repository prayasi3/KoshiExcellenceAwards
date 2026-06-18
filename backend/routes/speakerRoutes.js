import express from "express";
import {
  createSpeaker,
  deleteSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
} from "../controllers/speakerController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllSpeakers);
router.get("/:id", getSpeakerById);
router.post("/", requireAdmin, createSpeaker);
router.put("/:id", requireAdmin, updateSpeaker);
router.delete("/:id", requireAdmin, deleteSpeaker);

export const speakerRoutes = router;
