import { Gallery } from "../models/Gallery.js";
import {
  findPaginated,
  getEditionInclude,
  pickFields,
  requireFound,
} from "./serviceUtils.js";

const galleryFields = [
  "edition_id",
  "media_type",
  "media_url",
  "caption",
  "created_at",
];

export const getGalleryItems = async (query) =>
  findPaginated(Gallery, query, {
    allowedFilters: ["edition_id", "media_type"],
    defaultOrder: [["created_at", "DESC"]],
    sortableFields: ["id", "media_type", "created_at"],
    include: getEditionInclude(query),
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
