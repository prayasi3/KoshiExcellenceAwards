import express from "express";
import {
  createSponsor,
  deleteSponsor,
  getAllSponsors,
  getSponsorById,
  updateSponsor,
} from "../controllers/sponsorController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { validateBody, validateParams } from "../middleware/validateMiddleware.js";
import {
  idParamSchema,
  sponsorSchemas,
} from "../validations/validationSchemas.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllSponsors);
router.get("/:id", validateParams(idParamSchema), getSponsorById);
router.post("/", requireAdmin, validateBody(sponsorSchemas.create), createSponsor);
router.put(
  "/:id",
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(sponsorSchemas.update),
  updateSponsor
);
router.delete("/:id", requireAdmin, validateParams(idParamSchema), deleteSponsor);

export const sponsorRoutes = router;
