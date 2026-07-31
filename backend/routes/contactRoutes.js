import express from "express";
import { submitContactMessage } from "../controllers/contactController.js";
import { validateBody } from "../middleware/validateMiddleware.js";
import { contactSchemas } from "../validations/validationSchemas.js";

const router = express.Router();

// Public: anyone can submit the contact form.
router.post("/", validateBody(contactSchemas.create), submitContactMessage);

export const contactRoutes = router;