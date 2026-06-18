import express from "express";
import {
  createRecipient,
  deleteRecipient,
  getAllRecipients,
  getRecipientById,
  updateRecipient,
} from "../controllers/recipientController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllRecipients);
router.get("/:id", getRecipientById);
router.post("/", requireAdmin, createRecipient);
router.put("/:id", requireAdmin, updateRecipient);
router.delete("/:id", requireAdmin, deleteRecipient);

export const recipientRoutes = router;
