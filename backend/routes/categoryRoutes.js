import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { validateBody, validateParams } from "../middleware/validateMiddleware.js";
import {
  categorySchemas,
  idParamSchema,
} from "../validations/validationSchemas.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllCategories);
router.get("/:id", validateParams(idParamSchema), getCategoryById);
router.post(
  "/",
  requireAdmin,
  validateBody(categorySchemas.create),
  createCategory
);
router.put(
  "/:id",
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(categorySchemas.update),
  updateCategory
);
router.delete("/:id", requireAdmin, validateParams(idParamSchema), deleteCategory);

export const categoryRoutes = router;
