import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEditions, getEditionCategories } from "../services/editionService";
import { getCategories } from "../services/categoryService";
import FacebookMedia from "../../components/common/FacebookMedia";
import FormRichText from "../components/FormRichText";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";

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

  address: z
    .string()
    .max(255)
    .optional()
    .or(z.literal("")),

  slug: z
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

const emptyValues = {
  edition_id: "",
  category_id: "",
  full_name: "",
  title: "",
  address: "",
  slug: "",
  bio: "",
  photo_url: "",
};

export default function Recipients() {
  // =======================
  // State
  // =======================

  const [recipients, setRecipients] = useState([]);
  const [editions, setEditions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editionCategories, setEditionCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(recipientSchema),
    defaultValues: emptyValues,
  });

  // =======================
  // Lookup helpers (id -> readable name)
  // =======================

  const editionLabel = (editionId) => {
    const edition = editions.find((item) => Number(item.id) === Number(editionId));
    return edition ? `${edition.title} (${edition.year})` : `#${editionId}`;
  };

  const categoryLabel = (categoryId) => {
    const category = categories.find((item) => Number(item.id) === Number(categoryId));
    return category ? category.category_name : `#${categoryId}`;
  };

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
    getCategories()
      .then(setCategories)
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  // =======================
  // Open Add Modal
  // =======================

  const handleAdd = () => {
    setEditingRecipient(null);
    setEditionCategories([]);
    reset(emptyValues);
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
      title: recipient.title || "",
      address: recipient.address || "",
      slug: recipient.slug || "",
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

  const closeModal = () => {
    setShowModal(false);
    setEditingRecipient(null);
    setEditionCategories([]);
    reset(emptyValues);
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

      closeModal();
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
  // Filtering (search box)
  // =======================

  const visibleRecipients = recipients.filter((recipient) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.trim().toLowerCase();
    return (
      recipient.full_name?.toLowerCase().includes(term) ||
      recipient.title?.toLowerCase().includes(term) ||
      recipient.address?.toLowerCase().includes(term) ||
      categoryLabel(recipient.category_id).toLowerCase().includes(term)
    );
  });

  // =======================
  // JSX starts here
  // =======================

  return (
    <div className="p-6">
      {/* Header */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0B1F3A]">Awarded</h1>
          <p className="mt-1 text-sm text-gray-500">
            {recipients.length} Awarded{recipients.length === 1 ? "" : ""} total
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name, title, category..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] sm:w-72"
          />

          <button
            onClick={handleAdd}
            className="whitespace-nowrap rounded-lg bg-[#0B1F3A] px-4 py-2 font-medium text-white transition hover:bg-[#162D50]"
          >
            + Add Awarded
          </button>
        </div>
      </div>

      {/* Loading / Empty / Table */}

      {loading ? (
        <div className="rounded-lg bg-white py-10 text-center text-lg shadow">
          Loading recipients...
        </div>
      ) : visibleRecipients.length === 0 ? (
        <div className="rounded-lg bg-white py-14 text-center text-gray-500 shadow">
          {recipients.length === 0
            ? "No recipients yet. Click \u201c+ Add Recipient\u201d to create the first one."
            : "No recipients match your search."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Photo</th>
                <th className="border p-3 text-left">Full Name</th>
                <th className="border p-3 text-left">Edition</th>
                <th className="border p-3 text-left">Category</th>
                <th className="border p-3 text-left">Title</th>
                <th className="border p-3 text-left">Address</th>
                <th className="border p-3 text-left">Slug</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleRecipients.map((recipient) => (
                <tr key={recipient.id} className="hover:bg-gray-50">
                  <td className="border p-3">
                    {recipient.photo_url ? (
                      <FacebookMedia
                        src={recipient.photo_url}
                        alt={recipient.full_name}
                        className="h-12 w-12 rounded-full object-cover"
                        onError={() => {}}
                        placeholder={
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-400">
                            N/A
                          </div>
                        }
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-400">
                        N/A
                      </div>
                    )}
                  </td>

                  <td className="border p-3 font-medium">
                    {recipient.full_name}
                  </td>

                  <td className="border p-3">
                    {editionLabel(recipient.edition_id)}
                  </td>

                  <td className="border p-3">
                    {categoryLabel(recipient.category_id)}
                  </td>

                  <td className="border p-3">{recipient.title || "-"}</td>

                  <td className="border p-3">{recipient.address || "-"}</td>

                  <td className="border p-3 text-gray-500">
                    {recipient.slug || "-"}
                  </td>

                  <td className="border p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(recipient)}
                      className="rounded bg-[#C9A84C] px-3 py-1 text-white transition hover:bg-[#B4923D]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(recipient.id)}
                      className="rounded bg-red-600 px-3 py-1 text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-lg">
            <div className="p-6">
              <h2 className="mb-6 text-2xl font-bold text-[#0B1F3A]">
                {editingRecipient ? "Edit Recipient" : "Add Recipient"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Edition */}

                <FormSelect
                  label="Edition"
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
                  error={errors.edition_id?.message}
                >
                  <option value="">Select Edition</option>
                  {editions.map((edition) => (
                    <option key={edition.id} value={edition.id}>
                      {edition.title} ({edition.year})
                    </option>
                  ))}
                </FormSelect>

                {/* Category */}

                <FormSelect
                  label="Category"
                  {...register("category_id", { valueAsNumber: true })}
                  disabled={!editionCategories.length}
                  error={errors.category_id?.message}
                >
                  <option value="">
                    {editionCategories.length
                      ? "Select Category"
                      : "Select an edition first"}
                  </option>
                  {categories
                    .filter((category) => editionCategories.includes(category.id))
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.category_name}
                      </option>
                    ))}
                </FormSelect>

                {/* Full Name */}

                <FormInput
                  label="Full Name"
                  type="text"
                  placeholder="e.g. Ramesh Thapa"
                  {...register("full_name")}
                  error={errors.full_name?.message}
                />

                {/* Title */}

                <FormInput
                  label="Title"
                  type="text"
                  placeholder="e.g. Founder, XYZ Foundation"
                  {...register("title")}
                  error={errors.title?.message}
                />

                {/* Address */}

                <FormInput
                  label="Address"
                  type="text"
                  placeholder="e.g. Biratnagar, Koshi Province"
                  {...register("address")}
                  error={errors.address?.message}
                />

                {/* Slug */}

                <FormInput
                  label="Slug"
                  type="text"
                  placeholder="Auto-generated from full name if left blank"
                  {...register("slug")}
                  error={errors.slug?.message}
                />

                {/* Bio */}

                <FormRichText
                  label="Bio"
                  value={watch("bio")}
                  onChange={(html) =>
                    setValue("bio", html, { shouldDirty: true, shouldValidate: true })
                  }
                  error={errors.bio?.message}
                  placeholder="Write a short bio for this recipient..."
                />

                {/* Photo URL */}

                <FormInput
                  label="Photo URL"
                  type="text"
                  placeholder="https://..."
                  {...register("photo_url")}
                  error={errors.photo_url?.message}
                />

                {watch("photo_url") && (
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-sm text-gray-500">Preview:</span>
                    <FacebookMedia
                      src={watch("photo_url")}
                      alt="Photo preview"
                      className="h-16 w-16 rounded-full object-cover"
                      onError={() => {}}
                      placeholder={
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-400">
                          N/A
                        </div>
                      }
                    />
                  </div>
                )}

                {/* Buttons */}

                <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded bg-gray-500 px-4 py-2 text-white transition hover:bg-gray-600"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded bg-[#0B1F3A] px-4 py-2 text-white transition hover:bg-[#162D50]"
                  >
                    {editingRecipient ? "Update Recipient" : "Create Recipient"}
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