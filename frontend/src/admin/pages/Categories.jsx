import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextarea"; //

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

        <PageHeader
            title="Categories"
            buttonText="Add Category"
            onAdd={handleAdd}
        />

        {/* =======================
            Loading
        ======================== */}

        {loading ? (
            <LoadingSpinner />
        ) : (

            <Card>

                <div className="overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4 text-left">ID</th>

                                <th className="p-4 text-left">
                                    Category
                                </th>

                                <th className="p-4 text-left">
                                    Description
                                </th>

                                <th className="p-4 text-left">
                                    Status
                                </th>

                                <th className="p-4 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={5}
                                        className="py-10"
                                    >

                                        <EmptyState
                                            title="No Categories"
                                            description="Create your first category."
                                            buttonText="Add Category"
                                            onClick={handleAdd}
                                        />

                                    </td>

                                </tr>

                            ) : (

                                categories.map((category) => (

                                    <tr
                                        key={category.id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >

                                        <td className="p-4">
                                            {category.id}
                                        </td>

                                        <td className="p-4 font-semibold">
                                            {category.category_name}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {category.description || "-"}
                                        </td>

                                        <td className="p-4">

                                            <StatusBadge
                                                status={
                                                    category.is_active
                                                        ? "active"
                                                        : "inactive"
                                                }
                                            />

                                        </td>

                                        <td className="p-4">

                                            <div className="flex justify-center gap-2">

                                                <Button
                                                    variant="secondary"
                                                    onClick={() =>
                                                        handleEdit(category)
                                                    }
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                        handleDelete(category.id)
                                                    }
                                                >
                                                    Delete
                                                </Button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            </Card>

        )}

      {/* =======================
          Add / Edit Modal
      ======================== */}

            {showModal && (
              <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-8">

                <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
                  {editingCategory
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                  {/* Category Name */}

                  <FormInput
                    label="Category Name"
                    type="text"
                    placeholder="Enter category name"
                    {...register("category_name")}
                    error={errors.category_name?.message}
                  />

                  {/* Description */}

                  <FormTextarea
                    label="Description"
                    placeholder="Enter description"
                    rows={4}
                    {...register("description")}
                    error={errors.description?.message}
                  />

                  {/* Active */}

                  <div className="mb-6">

                    <label className="flex items-center gap-3 cursor-pointer">

                      <input
                        type="checkbox"
                        {...register("is_active")}
                        className="w-5 h-5 accent-[#C9A84C]"
                      />

                      <span className="font-medium">
                        Active
                      </span>

                    </label>

                  </div>

                  {/* Footer */}

                  <div className="flex justify-end gap-3">

                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShowModal(false);
                        setEditingCategory(null);

                        reset({
                          category_name: "",
                          slug: "",
                          description: "",
                          is_active: true,
                        });
                      }}
                    >
                      Cancel
                    </Button>

                    <Button type="submit">

                      {editingCategory
                        ? "Update Category"
                        : "Create Category"}

                    </Button>

                  </div>

                </form>

              </div>

            </div>
          )}

        </div>
      );
}