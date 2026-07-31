import { Contact } from "../models/Contact.js";
import { pickFields } from "./serviceUtils.js";

const contactFields = ["name", "email", "subject", "message"];

export const createContactMessage = async (body) => {
  const payload = pickFields(body, contactFields);
  return Contact.create(payload);
};