import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEditions } from "../services/editionService";

import Card from "../components/Card";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";
import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextarea";
import FormSelect from "../components/FormSelect";

import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../services/galleryService";

// =======================
// Zod Schema
// =======================

const galleryItemSchema = z.object({
  edition_id: z.coerce
    .number()
    .min(1, "Please select an edition"),

  media_type: z.enum(["image", "video"], {
    errorMap: () => ({
      message: "Please select a media type",
    }),
  }),

  media_url: z
    .string()
    .url("Please enter a valid URL"),

  caption: z.string().optional(),
});

export default function Gallery() {
  // =======================
  // State
  // =======================

  const [galleryItems, setGalleryItems] = useState([]);
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // =======================
  // React Hook Form
  // =======================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(galleryItemSchema),

    defaultValues: {
      edition_id: "",
      media_type: "image",
      media_url: "",
      caption: "",
    },
  });

  // =======================
  // Fetch Gallery
  // =======================

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);

      const data = await getGalleryItems();

      setGalleryItems(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load gallery items.");
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
    fetchGalleryItems();
    fetchEditions();
}, []);

  // =======================
  // Open Add Modal
  // =======================

  const handleAdd = () => {
    setEditingItem(null);

    reset({
      edition_id: "",
      media_type: "image",
      media_url: "",
      caption: "",
    });

    setShowModal(true);
  };

  // =======================
  // Open Edit Modal
  // =======================

  const handleEdit = (item) => {
    setEditingItem(item);

    reset({
      edition_id: item.edition_id,
      media_type: item.media_type,
      media_url: item.media_url,
      caption: item.caption || "",
    });

    setShowModal(true);
  };

  // =======================
  // Submit Form
  // =======================

  const onSubmit = async (data) => {
    try {
      if (editingItem) {
        await updateGalleryItem(editingItem.id, data);

        alert("Gallery item updated successfully.");
      } else {
        await createGalleryItem(data);

        alert("Gallery item created successfully.");
      }

      reset({
        edition_id: "",
        media_type: "image",
        media_url: "",
        caption: "",
      });

      setEditingItem(null);
      setShowModal(false);

      fetchGalleryItems();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // =======================
  // Delete Gallery Item
  // =======================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery item?"
    );

    if (!confirmDelete) return;

    try {
      await deleteGalleryItem(id);

      alert("Gallery item deleted successfully.");

      fetchGalleryItems();
    } catch (err) {
      console.error(err);
      alert("Failed to delete gallery item.");
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
      title="Gallery"
      buttonText="Add Media"
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
                  Edition
                </th>

                <th className="p-4 text-left">
                  Preview
                </th>

                <th className="p-4 text-left">
                  Type
                </th>

                <th className="p-4 text-left">
                  Caption
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {galleryItems.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="py-10"
                  >

                    <EmptyState
                      title="No Gallery Items"
                      description="Add your first gallery image or video."
                      buttonText="Add Media"
                      onClick={handleAdd}
                    />

                  </td>

                </tr>

              ) : (

                galleryItems.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4">
                      {item.edition?.title || item.edition_id}
                    </td>

                    <td className="p-4">

                      {item.media_type === "image" ? (
                        <img
                          src={item.media_url}
                          alt={item.caption}
                          className="w-20 h-14 object-cover rounded"
                        />
                      ) : (
                        <video
                          src={item.media_url}
                          className="w-24 rounded"
                        />
                      )}

                    </td>

                    <td className="p-4">

                      <StatusBadge
                        status={item.media_type}
                      />

                    </td>

                    <td className="p-4 text-gray-600">
                      {item.caption || "-"}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-2">

                        <Button
                          variant="secondary"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDelete(item.id)
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

            {editingItem
              ? "Edit Gallery Item"
              : "Add Gallery Item"}

          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Edition */}

            <FormSelect
              label="Edition"
              {...register("edition_id")}
              error={errors.edition_id?.message}
            >
              <option value="">
                Select Edition
              </option>

              {editions.map((edition) => (
                <option
                  key={edition.id}
                  value={edition.id}
                >
                  {edition.title}
                </option>
              ))}

            </FormSelect>

            {/* Media Type */}

            <FormSelect
              label="Media Type"
              {...register("media_type")}
              error={errors.media_type?.message}
            >
              <option value="image">
                Image
              </option>

              <option value="video">
                Video
              </option>

            </FormSelect>

            {/* Media URL */}

            <FormInput
              label="Media URL"
              type="text"
              placeholder="https://..."
              {...register("media_url")}
              error={errors.media_url?.message}
            />

            {/* Caption */}

            <FormTextarea
              label="Caption"
              rows={4}
              placeholder="Enter caption"
              {...register("caption")}
              error={errors.caption?.message}
            />

            {/* Footer */}

            <div className="flex justify-end gap-3">

              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                  setEditingItem(null);

                  reset({
                    edition_id: "",
                    media_type: "image",
                    media_url: "",
                    caption: "",
                  });
                }}
              >
                Cancel
              </Button>

              <Button type="submit">

                {editingItem
                  ? "Update Gallery Item"
                  : "Create Gallery Item"}

              </Button>

            </div>

          </form>

        </div>

      </div>

    )}

  </div>
);
}