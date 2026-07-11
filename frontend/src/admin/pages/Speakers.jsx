import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  getSpeakers,
  createSpeaker,
  updateSpeaker,
  deleteSpeaker,
} from "../services/speakerService";

// =======================
// Zod Schema
// =======================

const speakerSchema = z.object({
  edition_id: z.coerce.number().min(1, "Edition is required"),

  name: z.string().min(2, "Speaker name must be at least 2 characters"),

  designation: z.string().optional(),

  organization: z.string().optional(),

  bio: z.string().optional(),

  image_url: z.string().url("Enter a valid image URL").optional().or(z.literal("")),

  linkedin_url: z
    .string()
    .url("Enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),

  display_order: z.coerce.number().optional(),
});

export default function Speakers() {
  // =======================
  // State
  // =======================

  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState(null);

  // =======================
  // React Hook Form
  // =======================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(speakerSchema),

    defaultValues: {
      edition_id: "",
      name: "",
      designation: "",
      organization: "",
      bio: "",
      image_url: "",
      linkedin_url: "",
      display_order: 0,
    },
  });

  // =======================
  // Fetch Speakers
  // =======================

  const fetchSpeakers = async () => {
    try {
      setLoading(true);

      const data = await getSpeakers();

      setSpeakers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load speakers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  // =======================
  // Open Add Modal
  // =======================

  const handleAdd = () => {
    setEditingSpeaker(null);

    reset({
      edition_id: "",
      name: "",
      designation: "",
      organization: "",
      bio: "",
      image_url: "",
      linkedin_url: "",
      display_order: 0,
    });

    setShowModal(true);
  };

  // =======================
  // Open Edit Modal
  // =======================

  const handleEdit = (speaker) => {
    setEditingSpeaker(speaker);

    reset({
      edition_id: speaker.edition_id,
      name: speaker.name,
      designation: speaker.designation || "",
      organization: speaker.organization || "",
      bio: speaker.bio || "",
      image_url: speaker.image_url || "",
      linkedin_url: speaker.linkedin_url || "",
      display_order: speaker.display_order ?? 0,
    });

    setShowModal(true);
  };

  // =======================
  // Submit Form
  // =======================

  const onSubmit = async (data) => {
    try {
      if (editingSpeaker) {
        await updateSpeaker(editingSpeaker.id, data);

        alert("Speaker updated successfully.");
      } else {
        await createSpeaker(data);

        alert("Speaker created successfully.");
      }

      reset({
        edition_id: "",
        name: "",
        designation: "",
        organization: "",
        bio: "",
        image_url: "",
        linkedin_url: "",
        display_order: 0,
      });

      setEditingSpeaker(null);
      setShowModal(false);

      fetchSpeakers();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // =======================
  // Delete Speaker
  // =======================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this speaker?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSpeaker(id);

      alert("Speaker deleted successfully.");

      fetchSpeakers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete speaker.");
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
      <h1 className="text-3xl font-bold">Speakers</h1>

      <button
        onClick={handleAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        + Add Speaker
      </button>
    </div>

    {/* =======================
        Loading
    ======================== */}

    {loading ? (
      <div className="text-center py-10 text-lg">
        Loading speakers...
      </div>
    ) : (
      <>
        {/* =======================
            Speakers Table
        ======================== */}

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">ID</th>
                <th className="border p-3 text-left">Edition ID</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Designation</th>
                <th className="border p-3 text-left">Organization</th>
                <th className="border p-3 text-left">Display Order</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {speakers.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="border p-6 text-center text-gray-500"
                  >
                    No speakers found.
                  </td>
                </tr>
              ) : (
                speakers.map((speaker) => (
                  <tr key={speaker.id} className="hover:bg-gray-50">
                    <td className="border p-3">{speaker.id}</td>

                    <td className="border p-3">{speaker.edition_id}</td>

                    <td className="border p-3 font-medium">
                      {speaker.name}
                    </td>

                    <td className="border p-3">
                      {speaker.designation || "-"}
                    </td>

                    <td className="border p-3">
                      {speaker.organization || "-"}
                    </td>

                    <td className="border p-3">
                      {speaker.display_order}
                    </td>

                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(speaker)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(speaker.id)}
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
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            {editingSpeaker ? "Edit Speaker" : "Add Speaker"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Edition ID */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Edition ID
              </label>

              <input
                type="number"
                {...register("edition_id")}
                className="w-full border rounded p-2"
              />

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

            {/* Designation */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Designation
              </label>

              <input
                type="text"
                {...register("designation")}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Organization */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Organization
              </label>

              <input
                type="text"
                {...register("organization")}
                className="w-full border rounded p-2"
              />
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
            </div>

            {/* Image URL */}

            <div className="mb-4">
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

            {/* LinkedIn URL */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                LinkedIn URL
              </label>

              <input
                type="text"
                {...register("linkedin_url")}
                className="w-full border rounded p-2"
              />

              {errors.linkedin_url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.linkedin_url.message}
                </p>
              )}
            </div>

            {/* Display Order */}

            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Display Order
              </label>

              <input
                type="number"
                {...register("display_order")}
                className="w-full border rounded p-2"
              />

              {errors.display_order && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.display_order.message}
                </p>
              )}
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setEditingSpeaker(null);

                  reset({
                    edition_id: "",
                    name: "",
                    designation: "",
                    organization: "",
                    bio: "",
                    image_url: "",
                    linkedin_url: "",
                    display_order: 0,
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
                {editingSpeaker
                  ? "Update Speaker"
                  : "Create Speaker"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
}