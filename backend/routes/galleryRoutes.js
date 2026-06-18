import express from "express";
import {
  createGalleryItem,
  deleteGalleryItem,
  getAllGalleryItems,
  getGalleryItemById,
  updateGalleryItem,
} from "../controllers/galleryController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { validateBody, validateParams } from "../middleware/validateMiddleware.js";
import {
  gallerySchemas,
  idParamSchema,
} from "../validations/validationSchemas.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllGalleryItems);
router.get("/:id", validateParams(idParamSchema), getGalleryItemById);
router.post("/", requireAdmin, validateBody(gallerySchemas.create), createGalleryItem);
router.put(
  "/:id",
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(gallerySchemas.update),
  updateGalleryItem
);
router.delete(
  "/:id",
  requireAdmin,
  validateParams(idParamSchema),
  deleteGalleryItem
);

export const galleryRoutes = router;
