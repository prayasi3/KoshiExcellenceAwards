import { Category } from "../models/Category.js";

const getCategoryPayload = (body) => {
  const payload = {};

  if (body.category_name !== undefined) {
    payload.category_name = body.category_name;
  }

  if (body.description !== undefined) {
    payload.description = body.description;
  }

  if (body.is_active !== undefined) {
    payload.is_active = body.is_active;
  }

  return payload;
};

// GET all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single category
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE category
export const createCategory = async (req, res) => {
  try {
    const payload = getCategoryPayload(req.body);

    if (!payload.category_name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const category = await Category.create(payload);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const payload = getCategoryPayload(req.body);

    if (
      payload.category_name !== undefined &&
      String(payload.category_name).trim() === ""
    ) {
      return res.status(400).json({ message: "Category name is required" });
    }

    await category.update(payload);

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy();

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
