import express from "express";

import {
  getAllEditions,
  getEditionById,
  createEdition,
  updateEdition,
  deleteEdition,
} from "../controllers/editionController.js";

const router = express.Router();

router.get("/", getAllEditions);
router.get("/:id", getEditionById);
router.post("/", createEdition);
router.put("/:id", updateEdition);
router.delete("/:id", deleteEdition);

export const editionRoutes = router;
