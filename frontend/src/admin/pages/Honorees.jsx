import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEditions } from "../services/editionService";

import {
  getHonorees,
  createHonoree,
  updateHonoree,
  deleteHonoree,
} from "../services/honoreeService";

// =======================
// Zod Schema
// =======================

const honoreeSchema = z.object({
  edition_id: z.coerce.number().min(1, "Edition is required"),

  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),

  subtitle: z.string().optional(),

  slug: z.string().optional(),

  recognition: z.string().optional(),

  description: z.string().optional(),

  image_url: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal("")),
});

export default function Honorees() {
  // =======================
  // State
  // =======================

  const [honorees, setHonorees] = useState([]);
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingHonoree, setEditingHonoree] = useState(null);

  // =======================
  // React Hook Form
  // =======================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(honoreeSchema),

    defaultValues: {
      edition_id: "",
      name: "",
      subtitle: "",
      slug: "",
      recognition: "",
      description: "",
      image_url: "",
    },
  });

  // =======================
  // Fetch Honorees
  // =======================

  const fetchHonorees = async () => {
    try {
      setLoading(true);

      const data = await getHonorees();

      setHonorees(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load honorees.");
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

  useEffect(() => {
    fetchHonorees();
    fetchEditions();
}, []);

  // =======================
  // Open Add Modal
  // =======================

  const handleAdd = () => {
    setEditingHonoree(null);

    reset({
      edition_id: "",
      name: "",
      subtitle: "",
      slug: "",
      recognition: "",
      description: "",
      image_url: "",
    });

    setShowModal(true);
  };

  // =======================
  // Open Edit Modal
  // =======================

  const handleEdit = (honoree) => {
    setEditingHonoree(honoree);

    reset({
      edition_id: honoree.edition_id,
      name: honoree.name,
      subtitle: honoree.subtitle || "",
      slug: honoree.slug || "",
      recognition: honoree.recognition || "",
      description: honoree.description || "",
      image_url: honoree.image_url || "",
    });

    setShowModal(true);
  };

  // =======================
  // Submit Form
  // =======================

  const onSubmit = async (data) => {
    try {
      if (editingHonoree) {
        await updateHonoree(editingHonoree.id, data);

        alert("Honoree updated successfully.");
      } else {
        await createHonoree(data);

        alert("Honoree created successfully.");
      }

      reset({
        edition_id: "",
        name: "",
        subtitle: "",
        slug: "",
        recognition: "",
        description: "",
        image_url: "",
      });

      setEditingHonoree(null);
      setShowModal(false);

      fetchHonorees();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // =======================
  // Delete Honoree
  // =======================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this honoree?"
    );

    if (!confirmDelete) return;

    try {
      await deleteHonoree(id);

      alert("Honoree deleted successfully.");

      fetchHonorees();
    } catch (err) {
      console.error(err);
      alert("Failed to delete honoree.");
    }
  };

  // =======================
  // JSX starts here
  // =======================

  return (
  <div className="p-6">
    {/* =======================
        Header
    ======================= */}

    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Honorees</h1>

      <button
        onClick={handleAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        + Add Honoree
      </button>
    </div>

    {/* =======================
        Loading
    ======================= */}

    {loading ? (
      <div className="text-center py-10 text-lg">
        Loading honorees...
      </div>
    ) : (
      <>
        {/* =======================
            Honorees Table
        ======================= */}

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">ID</th>
                <th className="border p-3 text-left">Edition</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Recognition</th>
                <th className="border p-3 text-left">Subtitle</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {honorees.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="border p-6 text-center text-gray-500"
                  >
                    No honorees found.
                  </td>
                </tr>
              ) : (
                honorees.map((honoree) => (
                  <tr key={honoree.id} className="hover:bg-gray-50">
                    <td className="border p-3">{honoree.id}</td>

                    <td className="border p-3">
                      {honoree.edition_id}
                    </td>

                    <td className="border p-3 font-medium">
                      {honoree.name}
                    </td>

                    <td className="border p-3">
                      {honoree.recognition || "-"}
                    </td>

                    <td className="border p-3">
                      {honoree.subtitle || "-"}
                    </td>

                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(honoree)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(honoree.id)}
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
    ======================= */}

    {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-lg">
          <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {editingHonoree ? "Edit Honoree" : "Add Honoree"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Edition ID */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Edition ID
              </label>

              <select
                {...register("edition_id")}
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.edition_id.message}
                </p>
              )}
            </div>

            {/* Name */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Name
              </label>

              <input
                type="text"
                {...register("name")}
                className="w-full border rounded p-2"
              />

              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Subtitle */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Subtitle
              </label>

              <input
                type="text"
                {...register("subtitle")}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Slug */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Slug
              </label>

              <input
                type="text"
                {...register("slug")}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Recognition */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Recognition
              </label>

              <input
                type="text"
                {...register("recognition")}
                className="w-full border rounded p-2"
              />
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

            {/* Image URL */}

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Image URL
              </label>

              <input
                type="text"
                {...register("image_url")}
                className="w-full border rounded p-2"
              />

              {errors.image_url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image_url.message}
                </p>
              )}
            </div>

            {/* Buttons */}

            <div className="sticky bottom-0 flex justify-end gap-3 bg-white pt-4 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingHonoree(null);

                  reset({
                    edition_id: "",
                    name: "",
                    subtitle: "",
                    slug: "",
                    recognition: "",
                    description: "",
                    image_url: "",
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
                {editingHonoree
                  ? "Update Honoree"
                  : "Create Honoree"}
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