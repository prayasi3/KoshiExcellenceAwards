import express from "express";
import {
  createSpeaker,
  deleteSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
} from "../controllers/speakerController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { validateBody, validateParams } from "../middleware/validateMiddleware.js";
import {
  idParamSchema,
  speakerSchemas,
} from "../validations/validationSchemas.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllSpeakers);
router.get("/:id", validateParams(idParamSchema), getSpeakerById);
router.post("/", requireAdmin, validateBody(speakerSchemas.create), createSpeaker);
router.put(
  "/:id",
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(speakerSchemas.update),
  updateSpeaker
);
router.delete("/:id", requireAdmin, validateParams(idParamSchema), deleteSpeaker);

export const speakerRoutes = router;
