import { Recipient } from "../models/Recipient.js";
import {
  hasBlankValue,
  pickFields,
  requireFound,
  requirePresent,
  requireValue,
} from "./serviceUtils.js";

const recipientFields = [
  "edition_id",
  "category_id",
  "full_name",
  "organization",
  "bio",
  "photo_url",
  "citation",
  "selected_by",
  "selected_at",
];

export const getRecipients = async () => Recipient.findAll();

export const getRecipient = async (id) =>
  requireFound(await Recipient.findByPk(id), "Recipient not found");

export const createRecipientRecord = async (body) => {
  const payload = pickFields(body, recipientFields);

  requirePresent(payload.edition_id, "Edition ID is required");
  requirePresent(payload.category_id, "Category ID is required");
  requireValue(payload.full_name, "Full name is required");

  return Recipient.create(payload);
};

export const updateRecipientRecord = async (id, body) => {
  const recipient = requireFound(
    await Recipient.findByPk(id),
    "Recipient not found"
  );
  const payload = pickFields(body, recipientFields);

  if (payload.edition_id !== undefined) {
    requirePresent(payload.edition_id, "Edition ID is required");
  }

  if (payload.category_id !== undefined) {
    requirePresent(payload.category_id, "Category ID is required");
  }

  if (payload.full_name !== undefined && hasBlankValue(payload.full_name)) {
    requireValue(payload.full_name, "Full name is required");
  }

  await recipient.update(payload);
  return recipient;
};

export const deleteRecipientRecord = async (id) => {
  const recipient = requireFound(
    await Recipient.findByPk(id),
    "Recipient not found"
  );
  await recipient.destroy();
};
