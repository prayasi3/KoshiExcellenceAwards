import express from "express";
import {
  createGalleryItem,
  deleteGalleryItem,
  getAllGalleryItems,
  getGalleryItemById,
  updateGalleryItem,
} from "../controllers/galleryController.js";

const router = express.Router();

router.get("/", getAllGalleryItems);
router.get("/:id", getGalleryItemById);
router.post("/", createGalleryItem);
router.put("/:id", updateGalleryItem);
router.delete("/:id", deleteGalleryItem);

export const galleryRoutes = router;
