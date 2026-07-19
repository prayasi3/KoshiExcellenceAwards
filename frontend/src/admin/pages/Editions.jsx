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
import FormSelect from "../components/FormSelect.jsx";
import FormTextarea from "../components/FormTextarea"; //

import {
  getEditions,
  createEdition,
  updateEdition,
  deleteEdition,
  getEditionCategories,
} from "../services/editionService";
import { getCategories } from "../services/categoryService";

// =======================
// Zod Schema
// =======================

const editionSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),

  slug: z.string().min(2, "Slug must be at least 2 characters"),

  year: z.string().regex(/^\d{4}$/, "Year must be a valid 4-digit year"),

  venue: z.string().optional(),

  event_date: z.string().optional(),

  status: z.enum(["upcoming", "ongoing", "completed"]),
});

export default function Editions() {
  // =======================
  // State
  // =======================

  const [editions, setEditions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
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
      slug: "",
      year: "",
      venue: "",
      event_date: "",
      status: "upcoming",
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
    getCategories().then(setCategories).catch((err) => console.error("Failed to load categories", err));
  }, []);

  // =======================
  // Open Add Modal
  // =======================

  const handleAdd = () => {
    setEditingEdition(null);
    setSelectedCategoryIds([]);

    reset({
      title: "",
      slug: "",
      year: "",
      venue: "",
      event_date: "",
      status: "upcoming",
    });

    setShowModal(true);
  };

  // =======================
  // Open Edit Modal
  // =======================

  const handleEdit = async (edition) => {
    setEditingEdition(edition);

    try {
      const data = await getEditionCategories(edition.id);
      setSelectedCategoryIds(data.categories || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load assigned categories.");
      return;
    }

    reset({
      title: edition.title,
      slug: edition.slug,
      year: edition.year?.toString() || "",
      venue: edition.venue || "",
      event_date: edition.event_date
        ? edition.event_date.split("T")[0]
        : "",
      status: edition.status,
    });

    setShowModal(true);
  };

  // =======================
  // Submit Form
  // =======================

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, category_ids: selectedCategoryIds };
      if (editingEdition) {
        await updateEdition(editingEdition.id, payload);

        alert("Edition updated successfully.");
      } else {
        await createEdition(payload);

        alert("Edition created successfully.");
      }

      reset({
        title: "",
        slug: "",
        year: "",
        venue: "",
        event_date: "",
        status: "upcoming",
      });

      setEditingEdition(null);
      setSelectedCategoryIds([]);
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

    <PageHeader
      title="Editions"
      buttonText="Add Edition"
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
                  Title
                </th>

                <th className="p-4 text-left">
                  Year
                </th>

                <th className="p-4 text-left">
                  Venue
                </th>

                <th className="p-4 text-left">
                  Event Date
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
              {editions.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-10"
                  >
                    <EmptyState
                      title="No Editions"
                      description="Create your first edition."
                      buttonText="Add Edition"
                      onClick={handleAdd}
                    />
                  </td>
                </tr>
              ) : (
                editions.map((edition) => (
                  <tr
                    key={edition.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      {edition.id}
                    </td>

                    <td className="p-4 font-semibold">
                      {edition.title}
                    </td>

                    <td className="p-4">
                      {edition.year}
                    </td>

                    <td className="p-4 text-gray-600">
                      {edition.venue || "-"}
                    </td>

                    <td className="p-4">
                      {edition.event_date || "-"}
                    </td>

                    <td className="p-4">
                      <StatusBadge status={edition.status} />
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleEdit(edition)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDelete(edition.id)
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl">
          <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
            {editingEdition
              ? "Edit Edition"
              : "Add Edition"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Title"
              type="text"
              placeholder="Enter edition title"
              {...register("title")}
              error={errors.title?.message}
            />

            <FormInput
              label="Slug"
              type="text"
              placeholder="Enter slug"
              {...register("slug")}
              error={errors.slug?.message}
            />

            <FormInput
              label="Year"
              type="text"
              placeholder="2025"
              {...register("year")}
              error={errors.year?.message}
            />

            <FormInput
              label="Venue"
              type="text"
              placeholder="Enter venue"
              {...register("venue")}
              error={errors.venue?.message}
            />

            <FormInput
              label="Event Date"
              type="date"
              {...register("event_date")}
              error={errors.event_date?.message}
            />

            <FormSelect
              label="Status"
              {...register("status")}
              error={errors.status?.message}
            >
              <option value="upcoming">
                Upcoming
              </option>

              <option value="ongoing">
                Ongoing
              </option>

              <option value="completed">
                Completed
              </option>
            </FormSelect>

            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="mb-3">
                <h3 className="font-semibold text-[#0B1F3A]">Categories</h3>
                <p className="text-sm text-gray-600">Select the award categories available for this edition.</p>
              </div>
              {categories.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {categories.map((category) => {
                    const checked = selectedCategoryIds.includes(category.id);
                    return (
                      <label key={category.id} className="flex cursor-pointer items-center gap-3 rounded-md bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => setSelectedCategoryIds((ids) => checked ? ids.filter((id) => id !== category.id) : [...ids, category.id])}
                          className="h-4 w-4 rounded border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]"
                        />
                        {category.category_name}
                      </label>
                    );
                  })}
                </div>
              ) : <p className="text-sm text-gray-500">No categories are available yet.</p>}
            </div>

            <div className="sticky bottom-0 flex justify-end gap-3 bg-white pt-4 border-t">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                  setEditingEdition(null);
                  setSelectedCategoryIds([]);

                  reset({
                    title: "",
                    slug: "",
                    year: "",
                    venue: "",
                    event_date: "",
                    status: "upcoming",
                  });
                }}
              >
                Cancel
              </Button>

              <Button type="submit">
                {editingEdition
                  ? "Update Edition"
                  : "Create Edition"}
              </Button>
            </div>
          </form>
            </div>
          </div>
        </div>

    )}
  </div>
);
}
