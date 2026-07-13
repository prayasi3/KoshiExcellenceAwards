import express from "express";
import {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { validateBody, validateParams } from "../middleware/validateMiddleware.js";
import {
  idParamSchema,
  recipientSchemas,
} from "../validations/validationSchemas.js";
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];
const router = express.Router();

router.get("/", getNews);
router.get("/:id", getNewsById);
router.post("/", createNews);
router.put("/:id", updateNews);
router.delete("/:id", deleteNews);

//export default router;
export const newsRoutes = router;