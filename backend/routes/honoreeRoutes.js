import express from "express";
import {
  createHonoree,
  deleteHonoree,
  getAllHonorees,
  getHonoreeById,
  updateHonoree,
} from "../controllers/honoreeController.js";

const router = express.Router();

router.get("/", getAllHonorees);
router.get("/:id", getHonoreeById);
router.post("/", createHonoree);
router.put("/:id", updateHonoree);
router.delete("/:id", deleteHonoree);

export const honoreeRoutes = router;
