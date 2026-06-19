import {
  createGalleryRecord,
  deleteGalleryRecord,
  getGalleryItem,
  getGalleryItems,
  updateGalleryRecord,
} from "../services/galleryService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getAllGalleryItems = asyncHandler(async (req, res) => {
  const data = await getGalleryItems(req.query);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const getGalleryItemById = asyncHandler(async (req, res) => {
  const data = await getGalleryItem(req.params.id);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  const data = await createGalleryRecord(req.body);
  return sendSuccess(res, 201, "Created successfully", data);
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  const data = await updateGalleryRecord(req.params.id, req.body);
  return sendSuccess(res, 200, "Updated successfully", data);
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  await deleteGalleryRecord(req.params.id);
  return sendSuccess(res, 200, "Deleted successfully");
});
