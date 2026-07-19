import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEditions, getEditionCategories } from "../services/editionService";
import { getCategories } from "../services/categoryService";

import {
  getRecipients,
  createRecipient,
  updateRecipient,
  deleteRecipient,
} from "../services/recipientService";
// =======================
// Zod Schema
// =======================
export const recipientSchema = z.object({
  edition_id: z
    .number({
      required_error: "Edition is required",
    })
    .int()
    .positive(),

  category_id: z
    .number({
      required_error: "Category is required",
    })
    .int()
    .positive(),

  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(255),

  title: z
    .string()
    .max(255)
    .optional()
    .or(z.literal("")),

  bio: z
    .string()
    .optional()
    .or(z.literal("")),

  photo_url: z
    .string()
    .url("Photo URL must be a valid URL")
    .optional()
    .or(z.literal("")),
});

export default function Recipients() {
  // =======================
  // State
  // =======================

  const [recipients, setRecipients] = useState([]);
  const [editions, setEditions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editionCategories, setEditionCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingRecipient, setEditingRecipient] = useState(null);

  // =======================
  // React Hook Form
  // =======================

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipientSchema),

    defaultValues: {
      edition_id: "",
      category_id: "",
      full_name: "",
      title: "",
      bio: "",
      photo_url: "",
    },
  });

  // =======================
  // Fetch Recipients
  // =======================

  const fetchRecipients = async () => {
    try {
      setLoading(true);

      const data = await getRecipients();

      setRecipients(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load recipients.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEditions = async () => {
  try {
    const data = await getEditions();
    setEditions(data);
  } catch (err) {
    console.error(err);
  }
};

  const loadEditionCategories = async (editionId) => {
    if (!editionId) {
      setEditionCategories([]);
      return;
    }
    const data = await getEditionCategories(editionId);
    setEditionCategories(data.categories || []);
  };

  useEffect(() => {
    fetchRecipients();
    fetchEditions();
    getCategories().then(setCategories).catch((err) => console.error("Failed to load categories", err));
}, []);

  // =======================
  // Open Add Modal
  // =======================

  const handleAdd = () => {
    setEditingRecipient(null);
    setEditionCategories([]);

    reset({
      edition_id: "",
      category_id: "",
      full_name: "",
      title: "",
      bio: "",
      photo_url: "",
    });

    setShowModal(true);
  };

  // =======================
  // Open Edit Modal
  // =======================

  const handleEdit = async (recipient) => {
    setEditingRecipient(recipient);

    reset({
      edition_id: recipient.edition_id,
      category_id: recipient.category_id,
      full_name: recipient.full_name,
      title: recipient.title,
      bio: recipient.bio || "",
      photo_url: recipient.photo_url || "",
    });

    try {
      await loadEditionCategories(recipient.edition_id);
    } catch (err) {
      console.error(err);
      alert("Failed to load categories for this edition.");
      return;
    }

    setShowModal(true);
  };
  const editionField = register("edition_id", { valueAsNumber: true });

  // =======================
  // Submit Form
  // =======================

  const onSubmit = async (data) => {
    try {
      if (editingRecipient) {
        await updateRecipient(editingRecipient.id, data);

        alert("Recipient updated successfully.");
      } else {
        await createRecipient(data);

        alert("Recipient created successfully.");
      }

      reset({
        edition_id: "",
        category_id: "",
        full_name: "",
        title: "",
        bio: "",
        photo_url: "",
      });

      setEditingRecipient(null);
      setShowModal(false);

      fetchRecipients();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // =======================
  // Delete Recipient
  // =======================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipient?"
    );

    if (!confirmDelete) return;

    try {
      await deleteRecipient(id);

      alert("Recipient deleted successfully.");

      fetchRecipients();
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipient.");
    }
  };
  // =======================
  // JSX starts here
  // =======================

  return (
  <div className="p-6">
    {/* Header */}

    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Recipients</h1>

      <button
        onClick={handleAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        + Add Recipient
      </button>
    </div>

    {/* Loading */}

    {loading ? (
      <div className="text-center py-10 text-lg">
        Loading recipients...
      </div>
    ) : (
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Edition</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Full Name</th>
              <th className="border p-3">Title</th>
              <th className="border p-3">Photo</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {recipients.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="border p-6 text-center text-gray-500"
                >
                  No recipients found.
                </td>
              </tr>
            ) : (
              recipients.map((recipient) => (
                <tr key={recipient.id} className="hover:bg-gray-50">
                  <td className="border p-3">{recipient.id}</td>

                  <td className="border p-3">
                    {recipient.edition_id}
                  </td>

                  <td className="border p-3">
                    {recipient.category_id}
                  </td>

                  <td className="border p-3 font-medium">
                    {recipient.full_name}
                  </td>

                  <td className="border p-3">
                    {recipient.title}
                  </td>

                  <td className="border p-3">
                    {recipient.photo_url ? (
                      <img
                        src={recipient.photo_url}
                        alt={recipient.full_name}
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="border p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(recipient)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(recipient.id)}
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
    )}

    {/* Add / Edit Modal */}

    {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-lg">
          <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {editingRecipient ? "Edit Recipient" : "Add Recipient"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Edition ID */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Edition ID
              </label>

              <select
                {...editionField}
                onChange={async (event) => {
                  editionField.onChange(event);
                  setValue("category_id", "");
                  try {
                    await loadEditionCategories(event.target.value);
                  } catch (err) {
                    console.error(err);
                    setEditionCategories([]);
                    alert("Failed to load categories for this edition.");
                  }
                }}
                className="w-full border rounded p-2"
            >
                <option value="">Select Edition</option>

                {editions.map((edition) => (
                    <option key={edition.id} value={edition.id}>
                        {edition.title} ({edition.year})
                    </option>
                ))}
            </select>

              {errors.edition_id && (
                <p className="text-red-500 text-sm">
                  {errors.edition_id.message}
                </p>
              )}
            </div>

            {/* Category */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Category
              </label>

              <select
                {...register("category_id", { valueAsNumber: true })}
                className="w-full border rounded p-2"
                disabled={!editionCategories.length}
              >
                <option value="">{editionCategories.length ? "Select Category" : "Select an edition first"}</option>
                {categories.filter((category) => editionCategories.includes(category.id)).map((category) => (
                  <option key={category.id} value={category.id}>{category.category_name}</option>
                ))}
              </select>

              {errors.category_id && (
                <p className="text-red-500 text-sm">
                  {errors.category_id.message}
                </p>
              )}
            </div>

            {/* Full Name */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                {...register("full_name")}
                className="w-full border rounded p-2"
              />

              {errors.full_name && (
                <p className="text-red-500 text-sm">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Title */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Title
              </label>

              <input
                type="text"
                {...register("title")}
                className="w-full border rounded p-2"
              />

              {errors.title && (
                <p className="text-red-500 text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Bio */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Bio
              </label>

              <textarea
                rows={4}
                {...register("bio")}
                className="w-full border rounded p-2"
              />

              {errors.bio && (
                <p className="text-red-500 text-sm">
                  {errors.bio.message}
                </p>
              )}
            </div>

            {/* Photo URL */}

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Photo URL
              </label>

              <input
                type="text"
                {...register("photo_url")}
                className="w-full border rounded p-2"
              />

              {errors.photo_url && (
                <p className="text-red-500 text-sm">
                  {errors.photo_url.message}
                </p>
              )}
            </div>

            {/* Buttons */}

            <div className="sticky bottom-0 flex justify-end gap-3 bg-white pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingRecipient(null);
                  setEditionCategories([]);

                  reset({
                    edition_id: "",
                    category_id: "",
                    full_name: "",
                    title: "",
                    bio: "",
                    photo_url: "",
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
                {editingRecipient
                  ? "Update Recipient"
                  : "Create Recipient"}
              </button>
            </div>
          </form>
            </div>
          </div>
        </div>
    )}
  </div>
);
}
