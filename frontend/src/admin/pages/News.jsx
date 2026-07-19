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
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../services/newsService";

// =======================
// Zod Schema
// =======================

const newsSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters"),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters"),

  content: z
    .string()
    .min(10, "Content must be at least 10 characters"),

  featured_image: z
    .string()
    .url("Featured image must be a valid URL")
    .optional()
    .or(z.literal("")),

  published_at: z.string().optional(),
});

export default function News() {
  // =======================
  // State
  // =======================

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  // =======================
  // React Hook Form
  // =======================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(newsSchema),

    defaultValues: {
      title: "",
      slug: "",
      content: "",
      featured_image: "",
      published_at: "",
    },
  });

  // =======================
  // Fetch News
  // =======================

  const fetchNews = async () => {
    try {
      setLoading(true);

      const data = await getNews();

      setNews(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // =======================
  // Open Add Modal
  // =======================

  const handleAdd = () => {
    setEditingNews(null);

    reset({
      title: "",
      slug: "",
      content: "",
      featured_image: "",
      published_at: "",
    });

    setShowModal(true);
  };

  // =======================
  // Open Edit Modal
  // =======================

  const handleEdit = (item) => {
    setEditingNews(item);

    reset({
      title: item.title,
      slug: item.slug,
      content: item.content || "",
      featured_image: item.featured_image || "",
      published_at: item.published_at
        ? item.published_at.slice(0, 16)
        : "",
    });

    setShowModal(true);
  };

  // =======================
  // Submit Form
  // =======================

  const onSubmit = async (data) => {
    try {
      if (editingNews) {
        await updateNews(editingNews.id, data);

        alert("News updated successfully.");
      } else {
        await createNews(data);

        alert("News created successfully.");
      }

      reset({
        title: "",
        slug: "",
        content: "",
        featured_image: "",
        published_at: "",
      });

      setEditingNews(null);
      setShowModal(false);

      fetchNews();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // =======================
  // Delete News
  // =======================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this news article?"
    );

    if (!confirmDelete) return;

    try {
      await deleteNews(id);

      alert("News deleted successfully.");

      fetchNews();
    } catch (err) {
      console.error(err);
      alert("Failed to delete news.");
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
      title="News"
      buttonText="Add News"
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
                  Featured Image
                </th>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Slug
                </th>

                <th className="p-4 text-left">
                  Published
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {news.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10"
                  >
                    <EmptyState
                      title="No News"
                      description="Create your first news article."
                      buttonText="Add News"
                      onClick={handleAdd}
                    />
                  </td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      {item.id}
                    </td>

                    <td className="p-4">
                      {item.featured_image ? (
                        <img
                          src={item.featured_image}
                          alt={item.title}
                          className="w-20 h-14 rounded object-cover"
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="p-4 font-semibold">
                      {item.title}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.slug}
                    </td>

                    <td className="p-4 text-gray-600">
                      {item.published_at
                        ? new Date(
                            item.published_at
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleEdit(item)
                          }
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-lg">
          <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
            {editingNews
              ? "Edit News"
              : "Add News"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Title */}

            <FormInput
              label="Title"
              type="text"
              placeholder="Enter news title"
              {...register("title")}
              error={errors.title?.message}
            />

            {/* Slug */}

            <FormInput
              label="Slug"
              type="text"
              placeholder="example-news-title"
              {...register("slug")}
              error={errors.slug?.message}
            />

            {/* Featured Image */}

            <FormInput
              label="Featured Image URL"
              type="text"
              placeholder="https://example.com/image.jpg"
              {...register("featured_image")}
              error={errors.featured_image?.message}
            />

            {/* Published At */}

            <FormInput
              label="Published At"
              type="datetime-local"
              {...register("published_at")}
              error={errors.published_at?.message}
            />

            {/* Content */}

            <FormTextarea
              label="Content"
              placeholder="Write the news article..."
              rows={8}
              {...register("content")}
              error={errors.content?.message}
            />

            {/* Footer */}

            <div className="sticky bottom-0 flex justify-end gap-3 bg-white pt-4 border-t">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                  setEditingNews(null);

                  reset({
                    title: "",
                    slug: "",
                    content: "",
                    featured_image: "",
                    published_at: "",
                  });
                }}
              >
                Cancel
              </Button>

              <Button type="submit">
                {editingNews
                  ? "Update News"
                  : "Create News"}
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