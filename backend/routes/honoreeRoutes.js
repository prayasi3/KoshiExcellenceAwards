import express from "express";
import {
  createHonoree,
  deleteHonoree,
  getAllHonorees,
  getHonoreeById,
  updateHonoree,
} from "../controllers/honoreeController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";
import { validateBody, validateParams } from "../middleware/validateMiddleware.js";
import {
  honoreeSchemas,
  idParamSchema,
} from "../validations/validationSchemas.js";

const router = express.Router();
const requireAdmin = [protect, authorizeRoles(["admin", "super_admin"])];

router.get("/", getAllHonorees);
router.get("/:id", validateParams(idParamSchema), getHonoreeById);
router.post("/", requireAdmin, validateBody(honoreeSchemas.create), createHonoree);
router.put(
  "/:id",
  requireAdmin,
  validateParams(idParamSchema),
  validateBody(honoreeSchemas.update),
  updateHonoree
);
router.delete("/:id", requireAdmin, validateParams(idParamSchema), deleteHonoree);

export const honoreeRoutes = router;
