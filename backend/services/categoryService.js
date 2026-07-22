import { Category } from "../models/Category.js";
import {
  findPaginated,
  hasBlankValue,
  pickFields,
  requireFound,
  requireValue,
} from "./serviceUtils.js";

const categoryFields = [
  "category_name", 
  "slug", 
  "description", 
  "is_active"
];

export const getCategories = async (query) =>
  findPaginated(Category, query, {
    allowedFilters: ["is_active"],
    defaultOrder: [["category_name", "ASC"]],
    sortableFields: ["id", "category_name", "is_active"],
  });

export const getCategory = async (id) =>
  requireFound(await Category.findByPk(id), "Category not found");

export const createCategoryRecord = async (body) => {
  const payload = pickFields(body, categoryFields);
  requireValue(payload.category_name, "Category name is required");
  return Category.create(payload);
};

export const updateCategoryRecord = async (id, body) => {
  const category = requireFound(
    await Category.findByPk(id),
    "Category not found"
  );
  const payload = pickFields(body, categoryFields);

  if (payload.category_name !== undefined && hasBlankValue(payload.category_name)) {
    requireValue(payload.category_name, "Category name is required");
  }

  await category.update(payload);
  return category;
};

export const deleteCategoryRecord = async (id) => {
  const category = requireFound(await Category.findByPk(id), "Category not found");
  await category.destroy();
};
