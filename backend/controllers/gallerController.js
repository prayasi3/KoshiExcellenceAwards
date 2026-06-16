import { Gallery } from "../models/Gallery.js";

const galleryFields = [
  "edition_id",
  "media_type",
  "media_url",
  "caption",
  "created_at",
];

const getGalleryPayload = (body) => {
  const payload = {};

  galleryFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  return payload;
};

// GET all gallery items
export const getAllGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.findAll({
      order: [["created_at", "DESC"]],
    });

    res.status(200).json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single gallery item
export const getGalleryItemById = async (req, res) => {
  try {
    const galleryItem = await Gallery.findByPk(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.status(200).json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE gallery item
export const createGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.create(getGalleryPayload(req.body));
    res.status(201).json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE gallery item
export const updateGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findByPk(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    await galleryItem.update(getGalleryPayload(req.body));

    res.status(200).json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE gallery item
export const deleteGalleryItem = async (req, res) => {
  try {
    const galleryItem = await Gallery.findByPk(req.params.id);

    if (!galleryItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    await galleryItem.destroy();

    res.status(200).json({
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
