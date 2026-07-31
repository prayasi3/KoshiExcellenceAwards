import { createContactMessage } from "../services/contactService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const submitContactMessage = asyncHandler(async (req, res) => {
  const data = await createContactMessage(req.body);
  return sendSuccess(
    res,
    201,
    "Thanks for reaching out — we'll get back to you soon.",
    data
  );
});