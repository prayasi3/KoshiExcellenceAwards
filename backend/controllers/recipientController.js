import { Recipient } from "../models/Recipient.js";

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

const getRecipientPayload = (body) => {
  const payload = {};

  recipientFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  return payload;
};

const hasBlankValue = (value) => String(value ?? "").trim() === "";

// GET all recipients
export const getAllRecipients = async (req, res) => {
  try {
    const recipients = await Recipient.findAll();
    res.status(200).json(recipients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single recipient
export const getRecipientById = async (req, res) => {
  try {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    res.status(200).json(recipient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE recipient
export const createRecipient = async (req, res) => {
  try {
    const payload = getRecipientPayload(req.body);

    if (!payload.edition_id) {
      return res.status(400).json({ message: "Edition ID is required" });
    }

    if (!payload.category_id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    if (hasBlankValue(payload.full_name)) {
      return res.status(400).json({ message: "Full name is required" });
    }

    const recipient = await Recipient.create(payload);
    res.status(201).json(recipient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE recipient
export const updateRecipient = async (req, res) => {
  try {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    const payload = getRecipientPayload(req.body);

    if (payload.edition_id !== undefined && !payload.edition_id) {
      return res.status(400).json({ message: "Edition ID is required" });
    }

    if (payload.category_id !== undefined && !payload.category_id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    if (payload.full_name !== undefined && hasBlankValue(payload.full_name)) {
      return res.status(400).json({ message: "Full name is required" });
    }

    await recipient.update(payload);

    res.status(200).json(recipient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE recipient
export const deleteRecipient = async (req, res) => {
  try {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    await recipient.destroy();

    res.status(200).json({
      message: "Recipient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
