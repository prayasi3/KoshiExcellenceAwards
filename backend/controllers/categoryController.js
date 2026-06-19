import {
  createCategoryRecord,
  deleteCategoryRecord,
  getCategories,
  getCategory,
  updateCategoryRecord,
} from "../services/categoryService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getAllCategories = asyncHandler(async (req, res) => {
  const data = await getCategories(req.query);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const data = await getCategory(req.params.id);
  return sendSuccess(res, 200, "Fetched successfully", data);
});

export const createCategory = asyncHandler(async (req, res) => {
  const data = await createCategoryRecord(req.body);
  return sendSuccess(res, 201, "Created successfully", data);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const data = await updateCategoryRecord(req.params.id, req.body);
  return sendSuccess(res, 200, "Updated successfully", data);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  await deleteCategoryRecord(req.params.id);
  return sendSuccess(res, 200, "Deleted successfully");
});
