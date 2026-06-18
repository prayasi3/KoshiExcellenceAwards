import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { validateBody, validateParams } from "../middleware/validateMiddleware.js";
import { idParamSchema, userSchemas } from "../validations/validationSchemas.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.use(requireAdmin);

router.get("/", getAllUsers);
router.get("/:id", validateParams(idParamSchema), getUserById);
router.post("/", validateBody(userSchemas.create), createUser);
router.put(
  "/:id",
  validateParams(idParamSchema),
  validateBody(userSchemas.update),
  updateUser
);
router.delete("/:id", validateParams(idParamSchema), deleteUser);

export const userRoutes = router;
