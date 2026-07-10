import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

// =======================
// Zod Schema
// =======================

const categorySchema = z.object({
  category_name: z
    .string()
    .min(2, "Category name must be at least 2 characters"),

  description: z.string().optional(),

  is_active: z.boolean(),
});

export default function Categories() {
  // =======================
  // State
  // =======================

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // =======================
  // React Hook Form
  // =======================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      category_name: "",
      description: "",
      is_active: true,
    },
  });

  // =======================
  // Fetch Categories
  // =======================

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const data = await getCategories();

      setCategories(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // =======================
  // Open Add Modal
  // =======================

  const handleAdd = () => {
    setEditingCategory(null);

    reset({
      category_name: "",
      description: "",
      is_active: true,
    });

    setShowModal(true);
  };

  // =======================
  // Open Edit Modal
  // =======================

  const handleEdit = (category) => {
    setEditingCategory(category);

    reset({
      category_name: category.category_name,
      description: category.description || "",
      is_active: category.is_active,
    });

    setShowModal(true);
  };

  // =======================
  // Submit Form
  // =======================

  const onSubmit = async (data) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, data);

        alert("Category updated successfully.");
      } else {
        await createCategory(data);

        alert("Category created successfully.");
      }

      reset({
        category_name: "",
        description: "",
        is_active: true,
      });

      setEditingCategory(null);
      setShowModal(false);

      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // =======================
  // Delete Category
  // =======================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      alert("Category deleted successfully.");

      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to delete category.");
    }
  };

  // =======================
  // JSX starts here
  // =======================

  return (
        <div className="p-6">
      {/* =======================
          Header
      ======================== */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      {/* =======================
          Loading
      ======================== */}

      {loading ? (
        <div className="text-center py-10 text-lg">
          Loading categories...
        </div>
      ) : (
        <>
          {/* =======================
              Categories Table
          ======================== */}

          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-3 text-left">ID</th>
                  <th className="border p-3 text-left">Category</th>
                  <th className="border p-3 text-left">Description</th>
                  <th className="border p-3 text-left">Status</th>
                  <th className="border p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="border p-6 text-center text-gray-500"
                    >
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="border p-3">{category.id}</td>

                      <td className="border p-3 font-medium">
                        {category.category_name}
                      </td>

                      <td className="border p-3">
                        {category.description || "-"}
                      </td>

                      <td className="border p-3">
                        {category.is_active ? (
                          <span className="text-green-600 font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="text-red-600 font-medium">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="border p-3 text-center space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(category.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* =======================
          Add / Edit Modal
      ======================== */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editingCategory ? "Edit Category" : "Add Category"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Category Name */}

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Category Name
                </label>

                <input
                  type="text"
                  {...register("category_name")}
                  className="w-full border rounded p-2"
                />

                {errors.category_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category_name.message}
                  </p>
                )}
              </div>

              {/* Description */}

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Description
                </label>

                <textarea
                  rows={4}
                  {...register("description")}
                  className="w-full border rounded p-2"
                />

                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Active */}

              <div className="mb-6 flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("is_active")}
                />

                <label>Active</label>
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);

                    reset({
                      category_name: "",
                      description: "",
                      is_active: true,
                    });
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {editingCategory
                    ? "Update Category"
                    : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}