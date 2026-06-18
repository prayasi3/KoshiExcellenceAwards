import express from "express";
import {
  createSponsor,
  deleteSponsor,
  getAllSponsors,
  getSponsorById,
  updateSponsor,
} from "../controllers/sponsorController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllSponsors);
router.get("/:id", getSponsorById);
router.post("/", requireAdmin, createSponsor);
router.put("/:id", requireAdmin, updateSponsor);
router.delete("/:id", requireAdmin, deleteSponsor);

export const sponsorRoutes = router;
