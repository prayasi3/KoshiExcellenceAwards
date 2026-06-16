import express from "express";
import {
  createSpeaker,
  deleteSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeaker,
} from "../controllers/speakerController.js";

const router = express.Router();

router.get("/", getAllSpeakers);
router.get("/:id", getSpeakerById);
router.post("/", createSpeaker);
router.put("/:id", updateSpeaker);
router.delete("/:id", deleteSpeaker);

export const speakerRoutes = router;
