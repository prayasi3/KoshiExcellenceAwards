import express from "express";

import {
  getAllEditions,
  getEditionById,
  createEdition,
  updateEdition,
  deleteEdition,
} from "../controllers/editionController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllEditions);
router.get("/:id", getEditionById);
router.post("/", requireAdmin, createEdition);
router.put("/:id", requireAdmin, updateEdition);
router.delete("/:id", requireAdmin, deleteEdition);

export const editionRoutes = router;
