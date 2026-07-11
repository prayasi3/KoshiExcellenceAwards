import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  getSponsors,
  createSponsor,
  updateSponsor,
  deleteSponsor,
} from "../services/sponsorService";

// =======================
// Zod Schema
// =======================

const sponsorSchema = z.object({
  edition_id: z.coerce
    .number()
    .min(1, "Please select an edition."),

  sponsor_name: z
    .string()
    .min(2, "Sponsor name must be at least 2 characters."),

  logo_url: z
    .string()
    .url("Please enter a valid logo URL.")
    .optional()
    .or(z.literal("")),

  website: z
    .string()
    .url("Please enter a valid website URL.")
    .optional()
    .or(z.literal("")),

  sponsor_level: z.enum([
    "title",
    "platinum",
    "gold",
    "silver",
    "partner",
  ]),

  display_order: z.coerce.number().min(0),
});

export default function Sponsors() {
  // =======================
  // State
  // =======================

  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState(null);

  // =======================
  // React Hook Form
  // =======================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sponsorSchema),

    defaultValues: {
      edition_id: "",
      sponsor_name: "",
      logo_url: "",
      website: "",
      sponsor_level: "gold",
      display_order: 0,
    },
  });

  // =======================
  // Fetch Sponsors
  // =======================

  const fetchSponsors = async () => {
    try {
      setLoading(true);

      const data = await getSponsors();

      setSponsors(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load sponsors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  // =======================
  // Open Add Modal
  // =======================

  const handleAdd = () => {
    setEditingSponsor(null);

    reset({
      edition_id: "",
      sponsor_name: "",
      logo_url: "",
      website: "",
      sponsor_level: "gold",
      display_order: 0,
    });

    setShowModal(true);
  };

  // =======================
  // Open Edit Modal
  // =======================

  const handleEdit = (sponsor) => {
    setEditingSponsor(sponsor);

    reset({
      edition_id: sponsor.edition_id,
      sponsor_name: sponsor.sponsor_name,
      logo_url: sponsor.logo_url || "",
      website: sponsor.website || "",
      sponsor_level: sponsor.sponsor_level,
      display_order: sponsor.display_order,
    });

    setShowModal(true);
  };

  // =======================
  // Submit Form
  // =======================

  const onSubmit = async (data) => {
    try {
      if (editingSponsor) {
        await updateSponsor(editingSponsor.id, data);

        alert("Sponsor updated successfully.");
      } else {
        await createSponsor(data);

        alert("Sponsor created successfully.");
      }

      reset({
        edition_id: "",
        sponsor_name: "",
        logo_url: "",
        website: "",
        sponsor_level: "gold",
        display_order: 0,
      });

      setEditingSponsor(null);
      setShowModal(false);

      fetchSponsors();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // =======================
  // Delete Sponsor
  // =======================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sponsor?"
    );

    if (!confirmDelete) return;

    try {
      await deleteSponsor(id);

      alert("Sponsor deleted successfully.");

      fetchSponsors();
    } catch (err) {
      console.error(err);
      alert("Failed to delete sponsor.");
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
      <h1 className="text-3xl font-bold">Sponsors</h1>

      <button
        onClick={handleAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        + Add Sponsor
      </button>
    </div>

    {/* =======================
        Loading
    ======================== */}

    {loading ? (
      <div className="text-center py-10 text-lg">
        Loading sponsors...
      </div>
    ) : (
      <>
        {/* =======================
            Sponsors Table
        ======================== */}

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">ID</th>
                <th className="border p-3 text-left">Edition ID</th>
                <th className="border p-3 text-left">Sponsor</th>
                <th className="border p-3 text-left">Website</th>
                <th className="border p-3 text-left">Level</th>
                <th className="border p-3 text-left">Display Order</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {sponsors.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="border p-6 text-center text-gray-500"
                  >
                    No sponsors found.
                  </td>
                </tr>
              ) : (
                sponsors.map((sponsor) => (
                  <tr key={sponsor.id} className="hover:bg-gray-50">
                    <td className="border p-3">{sponsor.id}</td>

                    <td className="border p-3">
                      {sponsor.edition_id}
                    </td>

                    <td className="border p-3 font-medium">
                      {sponsor.sponsor_name}
                    </td>

                    <td className="border p-3">
                      {sponsor.website ? (
                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Visit
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="border p-3 capitalize">
                      {sponsor.sponsor_level}
                    </td>

                    <td className="border p-3">
                      {sponsor.display_order}
                    </td>

                    <td className="border p-3 text-center space-x-2">
                      <button
                        onClick={() => handleEdit(sponsor)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(sponsor.id)}
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
            {editingSponsor ? "Edit Sponsor" : "Add Sponsor"}
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

            {/* Sponsor Name */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Sponsor Name
              </label>

              <input
                type="text"
                {...register("sponsor_name")}
                className="w-full border rounded p-2"
              />

              {errors.sponsor_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sponsor_name.message}
                </p>
              )}
            </div>

            {/* Logo URL */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Logo URL
              </label>

              <input
                type="text"
                {...register("logo_url")}
                className="w-full border rounded p-2"
              />

              {errors.logo_url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.logo_url.message}
                </p>
              )}
            </div>

            {/* Website */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Website
              </label>

              <input
                type="text"
                {...register("website")}
                className="w-full border rounded p-2"
              />

              {errors.website && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.website.message}
                </p>
              )}
            </div>

            {/* Sponsor Level */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Sponsor Level
              </label>

              <select
                {...register("sponsor_level")}
                className="w-full border rounded p-2"
              >
                <option value="title">Title</option>
                <option value="platinum">Platinum</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="partner">Partner</option>
              </select>

              {errors.sponsor_level && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sponsor_level.message}
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
                  setEditingSponsor(null);

                  reset({
                    edition_id: "",
                    sponsor_name: "",
                    logo_url: "",
                    website: "",
                    sponsor_level: "gold",
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
                {editingSponsor
                  ? "Update Sponsor"
                  : "Create Sponsor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
);
}