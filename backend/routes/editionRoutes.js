import express from "express";

import {
  getAllEditions,
  getEditionById,
  getAssignedCategories,
  createEdition,
  updateEdition,
  deleteEdition,
} from "../controllers/editionController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { validateBody, validateParams } from "../middleware/validateMiddleware.js";
import {
  editionSchemas,
  idParamSchema,
} from "../validations/validationSchemas.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllEditions);
router.get("/:id/categories", validateParams(idParamSchema), getAssignedCategories);
router.get("/:id", validateParams(idParamSchema), getEditionById);
router.post("/", requireAdmin, validateBody(editionSchemas.create), createEdition);
router.put(
  "/:id",
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(editionSchemas.update),
  updateEdition
);
router.delete("/:id", requireAdmin, validateParams(idParamSchema), deleteEdition);

export const editionRoutes = router;
