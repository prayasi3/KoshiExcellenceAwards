import { Speaker } from "../models/Speaker.js";

const speakerFields = [
  "edition_id",
  "name",
  "designation",
  "organization",
  "bio",
  "image_url",
  "linkedin_url",
  "display_order",
  "created_at",
  "updated_at",
];

const getSpeakerPayload = (body) => {
  const payload = {};

  speakerFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  return payload;
};

const hasBlankValue = (value) => String(value ?? "").trim() === "";

// GET all speakers
export const getAllSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.findAll({
      order: [["display_order", "ASC"]],
    });

    res.status(200).json(speakers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single speaker
export const getSpeakerById = async (req, res) => {
  try {
    const speaker = await Speaker.findByPk(req.params.id);

    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    res.status(200).json(speaker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE speaker
export const createSpeaker = async (req, res) => {
  try {
    const payload = getSpeakerPayload(req.body);

    if (!payload.edition_id) {
      return res.status(400).json({ message: "Edition ID is required" });
    }

    if (hasBlankValue(payload.name)) {
      return res.status(400).json({ message: "Name is required" });
    }

    const speaker = await Speaker.create(payload);
    res.status(201).json(speaker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE speaker
export const updateSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByPk(req.params.id);

    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    const payload = getSpeakerPayload(req.body);

    if (payload.edition_id !== undefined && !payload.edition_id) {
      return res.status(400).json({ message: "Edition ID is required" });
    }

    if (payload.name !== undefined && hasBlankValue(payload.name)) {
      return res.status(400).json({ message: "Name is required" });
    }

    await speaker.update({
      ...payload,
      updated_at: new Date(),
    });

    res.status(200).json(speaker);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE speaker
export const deleteSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findByPk(req.params.id);

    if (!speaker) {
      return res.status(404).json({ message: "Speaker not found" });
    }

    await speaker.destroy();

    res.status(200).json({
      message: "Speaker deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
