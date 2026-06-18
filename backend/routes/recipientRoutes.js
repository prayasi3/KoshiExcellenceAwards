import express from "express";
import {
  createRecipient,
  deleteRecipient,
  getAllRecipients,
  getRecipientById,
  updateRecipient,
} from "../controllers/recipientController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { validateBody, validateParams } from "../middleware/validateMiddleware.js";
import {
  idParamSchema,
  recipientSchemas,
} from "../validations/validationSchemas.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllRecipients);
router.get("/:id", validateParams(idParamSchema), getRecipientById);
router.post("/", requireAdmin, validateBody(recipientSchemas.create), createRecipient);
router.put(
  "/:id",
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(recipientSchemas.update),
  updateRecipient
);
router.delete("/:id", requireAdmin, validateParams(idParamSchema), deleteRecipient);

export const recipientRoutes = router;
