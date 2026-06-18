import express from "express";
import {
  createGalleryItem,
  deleteGalleryItem,
  getAllGalleryItems,
  getGalleryItemById,
  updateGalleryItem,
} from "../controllers/galleryController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllGalleryItems);
router.get("/:id", getGalleryItemById);
router.post("/", requireAdmin, createGalleryItem);
router.put("/:id", requireAdmin, updateGalleryItem);
router.delete("/:id", requireAdmin, deleteGalleryItem);

export const galleryRoutes = router;
