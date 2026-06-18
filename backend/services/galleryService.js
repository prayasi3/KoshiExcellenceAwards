import { Gallery } from "../models/Gallery.js";
import { pickFields, requireFound } from "./serviceUtils.js";

const galleryFields = [
  "edition_id",
  "media_type",
  "media_url",
  "caption",
  "created_at",
];

export const getGalleryItems = async () =>
  Gallery.findAll({
    order: [["created_at", "DESC"]],
  });

export const getGalleryItem = async (id) =>
  requireFound(await Gallery.findByPk(id), "Gallery item not found");

export const createGalleryRecord = async (body) =>
  Gallery.create(pickFields(body, galleryFields));

export const updateGalleryRecord = async (id, body) => {
  const galleryItem = requireFound(
    await Gallery.findByPk(id),
    "Gallery item not found"
  );

  await galleryItem.update(pickFields(body, galleryFields));
  return galleryItem;
};

export const deleteGalleryRecord = async (id) => {
  const galleryItem = requireFound(
    await Gallery.findByPk(id),
    "Gallery item not found"
  );
  await galleryItem.destroy();
};
