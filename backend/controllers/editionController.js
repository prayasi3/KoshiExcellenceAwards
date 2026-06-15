import { Edition } from "../models/Edition.js";

// GET all editions
export const getAllEditions = async (req, res) => {
  try {
    const editions = await Edition.findAll();
    res.status(200).json(editions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single edition
export const getEditionById = async (req, res) => {
  try {
    const edition = await Edition.findByPk(req.params.id);

    if (!edition) {
      return res.status(404).json({ message: "Edition not found" });
    }

    res.status(200).json(edition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE edition
export const createEdition = async (req, res) => {
  try {
    const edition = await Edition.create(req.body);
    res.status(201).json(edition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE edition
export const updateEdition = async (req, res) => {
  try {
    const edition = await Edition.findByPk(req.params.id);

    if (!edition) {
      return res.status(404).json({ message: "Edition not found" });
    }

    await edition.update({
      ...req.body,
      updated_at: new Date(),
    });

    res.status(200).json(edition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE edition
export const deleteEdition = async (req, res) => {
  try {
    const edition = await Edition.findByPk(req.params.id);

    if (!edition) {
      return res.status(404).json({ message: "Edition not found" });
    }

    await edition.destroy();

    res.status(200).json({
      message: "Edition deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
