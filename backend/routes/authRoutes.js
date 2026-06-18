import express from "express";
import {
  getMe,
  login,
  refreshToken,
  register,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateBody } from "../middleware/validateMiddleware.js";
import { authSchemas } from "../validations/validationSchemas.js";

const router = express.Router();

router.post("/register", validateBody(authSchemas.register), register);
router.post("/login", validateBody(authSchemas.login), login);
router.post("/refresh", validateBody(authSchemas.refresh), refreshToken);
router.get("/me", protect, getMe);

export const authRoutes = router;
