import express from "express";
import {
  createRecipient,
  deleteRecipient,
  getAllRecipients,
  getRecipientById,
  updateRecipient,
} from "../controllers/recipientController.js";

const router = express.Router();

router.get("/", getAllRecipients);
router.get("/:id", getRecipientById);
router.post("/", createRecipient);
router.put("/:id", updateRecipient);
router.delete("/:id", deleteRecipient);

export const recipientRoutes = router;
