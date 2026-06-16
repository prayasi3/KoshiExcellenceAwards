import express from "express";
import {
  createSponsor,
  deleteSponsor,
  getAllSponsors,
  getSponsorById,
  updateSponsor,
} from "../controllers/sponsorController.js";

const router = express.Router();

router.get("/", getAllSponsors);
router.get("/:id", getSponsorById);
router.post("/", createSponsor);
router.put("/:id", updateSponsor);
router.delete("/:id", deleteSponsor);

export const sponsorRoutes = router;
