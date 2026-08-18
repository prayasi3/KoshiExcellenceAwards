import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEditions } from "../services/editionService";
import FormRichText from "../components/FormRichText";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import FacebookMedia from "../../components/common/FacebookMedia";

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

  address: z.string().optional(),

  slug: z.string().optional(),

  recognition: z.string().optional(),

  description: z.string().optional(),

  image_url: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal("")),
});

const emptyValues = {
  edition_id: "",
  name: "",
  subtitle: "",
  address: "",
  slug: "",
  recognition: "",
  description: "",
  image_url: "",
};

export default function Honorees() {
  // =======================
  // State
  // =======================

  const [honorees, setHonorees] = useState([]);
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingHonoree, setEditingHonoree] = useState(null);

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
    resolver: zodResolver(honoreeSchema),
    defaultValues: emptyValues,
  });

  // =======================
  // Lookup helper (id -> readable name)
  // =======================

  const editionLabel = (editionId) => {
    const edition = editions.find((item) => Number(item.id) === Number(editionId));
    return edition ? `${edition.title} (${edition.year})` : `#${editionId}`;
  };

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
    reset(emptyValues);
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
      address: honoree.address || "",
      slug: honoree.slug || "",
      recognition: honoree.recognition || "",
      description: honoree.description || "",
      image_url: honoree.image_url || "",
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingHonoree(null);
    reset(emptyValues);
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

      closeModal();
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
  // Filtering (search box)
  // =======================

  const visibleHonorees = honorees.filter((honoree) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.trim().toLowerCase();
    return (
      honoree.name?.toLowerCase().includes(term) ||
      honoree.subtitle?.toLowerCase().includes(term) ||
      honoree.recognition?.toLowerCase().includes(term) ||
      honoree.address?.toLowerCase().includes(term)
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
          <h1 className="text-3xl font-bold text-[#0B1F3A]">Honorees</h1>
          <p className="mt-1 text-sm text-gray-500">
            {honorees.length} honoree{honorees.length === 1 ? "" : "s"} total
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name, recognition, address..."
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#C9A84C] sm:w-72"
          />

          <button
            onClick={handleAdd}
            className="whitespace-nowrap rounded-lg bg-[#0B1F3A] px-4 py-2 font-medium text-white transition hover:bg-[#162D50]"
          >
            + Add Honoree
          </button>
        </div>
      </div>

      {/* Loading / Empty / Table */}

      {loading ? (
        <div className="rounded-lg bg-white py-10 text-center text-lg shadow">
          Loading honorees...
        </div>
      ) : visibleHonorees.length === 0 ? (
        <div className="rounded-lg bg-white py-14 text-center text-gray-500 shadow">
          {honorees.length === 0
            ? "No honorees yet. Click \u201c+ Add Honoree\u201d to create the first one."
            : "No honorees match your search."}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Photo</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Edition</th>
                <th className="border p-3 text-left">Recognition</th>
                <th className="border p-3 text-left">Subtitle</th>
                <th className="border p-3 text-left">Address</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleHonorees.map((honoree) => (
                <tr key={honoree.id} className="hover:bg-gray-50">
                  <td className="border p-3">
                    {honoree.image_url ? (
                      <FacebookMedia
                        src={honoree.image_url}
                        alt={honoree.name}
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

                  <td className="border p-3 font-medium">{honoree.name}</td>

                  <td className="border p-3">
                    {editionLabel(honoree.edition_id)}
                  </td>

                  <td className="border p-3">{honoree.recognition || "-"}</td>

                  <td className="border p-3">{honoree.subtitle || "-"}</td>

                  <td className="border p-3">{honoree.address || "-"}</td>

                  <td className="border p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(honoree)}
                      className="rounded bg-[#C9A84C] px-3 py-1 text-white transition hover:bg-[#B4923D]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(honoree.id)}
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
                {editingHonoree ? "Edit Honoree" : "Add Honoree"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Edition */}

                <FormSelect
                  label="Edition"
                  {...register("edition_id")}
                  error={errors.edition_id?.message}
                >
                  <option value="">Select Edition</option>
                  {editions.map((edition) => (
                    <option key={edition.id} value={edition.id}>
                      {edition.title} ({edition.year})
                    </option>
                  ))}
                </FormSelect>

                {/* Name */}

                <FormInput
                  label="Name"
                  type="text"
                  placeholder="e.g. Dr. Anjali Koirala"
                  {...register("name")}
                  error={errors.name?.message}
                />

                {/* Subtitle */}

                <FormInput
                  label="Subtitle"
                  type="text"
                  placeholder="e.g. Lifetime Achievement"
                  {...register("subtitle")}
                  error={errors.subtitle?.message}
                />

                {/* Address */}

                <FormInput
                  label="Address"
                  type="text"
                  placeholder="e.g. Dharan, Koshi Province"
                  {...register("address")}
                  error={errors.address?.message}
                />

                {/* Recognition */}

                <FormInput
                  label="Recognition"
                  type="text"
                  placeholder="e.g. Special Jury Mention"
                  {...register("recognition")}
                  error={errors.recognition?.message}
                />

                {/* Description */}

                <FormRichText
                  label="Description"
                  value={watch("description")}
                  onChange={(html) =>
                    setValue("description", html, { shouldDirty: true, shouldValidate: true })
                  }
                  error={errors.description?.message}
                  placeholder="Write a description for this honoree..."
                />

                {/* Image URL */}

                <FormInput
                  label="Image URL"
                  type="text"
                  placeholder="https://..."
                  {...register("image_url")}
                  error={errors.image_url?.message}
                />

                {watch("image_url") && (
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-sm text-gray-500">Preview:</span>
                    <FacebookMedia
                      src={watch("image_url")}
                      alt="Image preview"
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
                    {editingHonoree ? "Update Honoree" : "Create Honoree"}
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