import express from "express";
import {
  createHonoree,
  deleteHonoree,
  getAllHonorees,
  getHonoreeById,
  updateHonoree,
} from "../controllers/honoreeController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllHonorees);
router.get("/:id", getHonoreeById);
router.post("/", requireAdmin, createHonoree);
router.put("/:id", requireAdmin, updateHonoree);
router.delete("/:id", requireAdmin, deleteHonoree);

export const honoreeRoutes = router;
