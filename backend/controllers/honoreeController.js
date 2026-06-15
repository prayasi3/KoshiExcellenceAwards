import { Honoree } from "../models/Honoree.js";

const honoreeFields = [
  "edition_id",
  "name",
  "title",
  "description",
  "image_url",
  "created_at",
];

const getHonoreePayload = (body) => {
  const payload = {};

  honoreeFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  return payload;
};

const hasBlankValue = (value) => String(value ?? "").trim() === "";

// GET all honorees
export const getAllHonorees = async (req, res) => {
  try {
    const honorees = await Honoree.findAll();
    res.status(200).json(honorees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single honoree
export const getHonoreeById = async (req, res) => {
  try {
    const honoree = await Honoree.findByPk(req.params.id);

    if (!honoree) {
      return res.status(404).json({ message: "Honoree not found" });
    }

    res.status(200).json(honoree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE honoree
export const createHonoree = async (req, res) => {
  try {
    const payload = getHonoreePayload(req.body);

    if (hasBlankValue(payload.name)) {
      return res.status(400).json({ message: "Name is required" });
    }

    const honoree = await Honoree.create(payload);
    res.status(201).json(honoree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE honoree
export const updateHonoree = async (req, res) => {
  try {
    const honoree = await Honoree.findByPk(req.params.id);

    if (!honoree) {
      return res.status(404).json({ message: "Honoree not found" });
    }

    const payload = getHonoreePayload(req.body);

    if (payload.name !== undefined && hasBlankValue(payload.name)) {
      return res.status(400).json({ message: "Name is required" });
    }

    await honoree.update(payload);

    res.status(200).json(honoree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE honoree
export const deleteHonoree = async (req, res) => {
  try {
    const honoree = await Honoree.findByPk(req.params.id);

    if (!honoree) {
      return res.status(404).json({ message: "Honoree not found" });
    }

    await honoree.destroy();

    res.status(200).json({
      message: "Honoree deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
