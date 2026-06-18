import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//router.use(protect);
//router.use(authorizeRoles("super_admin", "admin"));

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export const userRoutes = router;
