import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  getEditions,
  createEdition,
  updateEdition,
  deleteEdition,
} from "../services/editionService";

// =======================
// Zod Schema
// =======================

const editionSchema = z.object({
  title: z
    .string()
    .min(2, "Edition title must be at least 2 characters"),

  year: z.coerce
  .number({
    required_error: "Year is required",
  })
  .int("Year must be a whole number")
  .min(1900, "Year must be at least 1900")
  .max(2100, "Year must be at most 2100"),

  venue: z.string().optional(),

  event_date: z.string().optional(),

  is_active: z.boolean(),
});

export default function Editions() {
  // =======================
  // State
  // =======================

  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingEdition, setEditingEdition] = useState(null);

  // =======================
  // React Hook Form
  // =======================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editionSchema),

    defaultValues: {
      title: "",
      year: "",
      venue: "",
      event_date: "",
      is_active: true,
    },
  });

  // =======================
  // Fetch Editions
  // =======================

  const fetchEditions = async () => {
    try {
      setLoading(true);

      const data = await getEditions();

      setEditions(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load editions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditions();
  }, []);

  // =======================
  // Open Add Modal
  // =======================

  const handleAdd = () => {
    setEditingEdition(null);

    reset({
      title: "",
      year: "",
      venue: "",
      event_date: "",
      is_active: true,
    });

    setShowModal(true);
  };

  // =======================
  // Open Edit Modal
  // =======================

  const handleEdit = (edition) => {
    setEditingEdition(edition);

    reset({
      title: edition.title || "",
      year: edition.year || "",
        venue: edition.venue || "",
        event_date: edition.event_date ? new Date(edition.event_date).toISOString().split("T")[0] : "",
      is_active: edition.is_active,
    });

    setShowModal(true);
  };

  // =======================
  // Submit Form
  // =======================

  const onSubmit = async (data) => {
    try {
      if (editingEdition) {
        await updateEdition(editingEdition.id, data);

        alert("Edition updated successfully.");
      } else {
        await createEdition(data);

        alert("Edition created successfully.");
      }

      reset({
        title: "",
        year: "",
        venue: "",
        event_date: "",
        is_active: true,
      });

      setEditingEdition(null);
      setShowModal(false);

      fetchEditions();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // =======================
  // Delete Edition
  // =======================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this edition?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEdition(id);

      alert("Edition deleted successfully.");

      fetchEditions();
    } catch (err) {
      console.error(err);
      alert("Failed to delete edition.");
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
        <h1 className="text-3xl font-bold">Editions</h1>

        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          + Add Edition
        </button>
      </div>

      {/* =======================
          Loading
      ======================== */}

      {loading ? (
        <div className="text-center py-10 text-lg">
          Loading editions...
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
                  <th className="border p-3 text-left">Title</th>
                  <th className="border p-3 text-left">Year</th>
                  <th className="border p-3 text-left">Venue</th>
                  <th className="border p-3 text-center">Event Date</th>
                  <th className="border p-3 text-center">Status</th>
                    <th className="border p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {editions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="border p-6 text-center text-gray-500"
                    >
                      No editions found.
                    </td>
                  </tr>
                ) : (
                  editions.map((edition) => (
                    <tr key={edition.id} className="hover:bg-gray-50">
                      <td className="border p-3">{edition.id}</td>

                      <td className="border p-3 font-medium">
                        {edition.title || "-"}
                      </td>

                      <td className="border p-3">
                        {edition.year || "-"}
                      </td>

                      <td className="border p-3">
                        {edition.venue || "-"}
                      </td>

                      <td className="border p-3 text-center">
                        {edition.event_date ? new Date(edition.event_date).toLocaleDateString() : "-"}
                      </td>

                      <td className="border p-3">
                        {edition.is_active ? (
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
                          onClick={() => handleEdit(edition)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(edition.id)}
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
              {editingEdition ? "Edit Edition" : "Add Edition"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Edition Title */}

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Edition Title
                </label>

                <input
                  type="text"
                  {...register("edition_title")}
                  className="w-full border rounded p-2"
                />

                {errors.edition_title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.edition_title.message}
                  </p>
                )}
              </div>

              {/* Year */}
  <div>
    <label className="block mb-1 font-medium">Year</label>
    <input
      type="number"
      {...register("year")}
      className="w-full border rounded p-2"
      placeholder="2026"
    />
    {errors.year && (
      <p className="text-red-500 text-sm">{errors.year.message}</p>
    )}
  </div>

  {/* Venue */}
  <div>
    <label className="block mb-1 font-medium">Venue</label>
    <input
      {...register("venue", {
        required: "Venue is required",
      })}
      className="w-full border rounded p-2"
      placeholder="Biratnagar"
    />
    {errors.venue && (
      <p className="text-red-500 text-sm">{errors.venue.message}</p>
    )}
  </div>

            {/* Event Date */}
            <div>
                <label className="block mb-1 font-medium">Event Date</label>
                <input
                type="date"
                {...register("event_date", {
                    required: "Event Date is required",
                })}
                className="w-full border rounded p-2"
                />
                {errors.event_date && (
                <p className="text-red-500 text-sm">{errors.event_date.message}</p>
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
                    setEditingEdition(null);

                    reset({
                      edition_title: "",
                      year: "",
                      venue: "",
                      event_date: "",
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
                  {editingEdition
                    ? "Update Edition"
                    : "Create Edition"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}