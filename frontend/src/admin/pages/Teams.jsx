import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getEditions } from "../services/editionService";

import {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../services/teamService";

// =======================
// Zod Schema
// =======================

const teamSchema = z.object({
  full_name: z
    .string()
    .min(2, "Full name must be at least 2 characters"),

  role: z.enum([
    "chief_advisor",
    "chief_judge",
    "chairman",
    "executive_director",
    "director",
    "member",
  ]),

  designation: z.string().optional(),

  photo_url: z.string().url("Enter a valid URL").optional().or(z.literal("")),

  bio: z.string().optional(),

  display_order: z.coerce.number().min(0),

  role_priority: z.coerce.number().min(1, "Role priority is required"),

  is_active: z.boolean(),
});

export default function Teams() {
  // =======================
  // State
  // =======================

  const [teams, setTeams] = useState([]);
  const [editions, setEditions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  // =======================
  // React Hook Form
  // =======================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teamSchema),

    defaultValues: {
      full_name: "",
      role: "member",
      designation: "",
      photo_url: "",
      bio: "",
      display_order: 0,
      role_priority: 1,
      is_active: true,
    },
  });

  // =======================
  // Fetch Teams
  // =======================

  const fetchTeams = async () => {
    try {
      setLoading(true);

      const data = await getTeams();

      setTeams(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load team members.");
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
    fetchTeams();
    fetchEditions();
}, []);

  // =======================
  // Open Add Modal
  // =======================

  const handleAdd = () => {
    setEditingTeam(null);

    reset({
      full_name: "",
      role: "member",
      designation: "",
      photo_url: "",
      bio: "",
      display_order: 0,
      role_priority: 1,
      is_active: true,
    });

    setShowModal(true);
  };

  // =======================
  // Open Edit Modal
  // =======================

  const handleEdit = (team) => {
    setEditingTeam(team);

    reset({
      full_name: team.full_name,
      role: team.role,
      designation: team.designation || "",
      photo_url: team.photo_url || "",
      bio: team.bio || "",
      display_order: team.display_order,
      role_priority: team.role_priority,
      is_active: team.is_active,
    });

    setShowModal(true);
  };

  // =======================
  // Submit Form
  // =======================

  const onSubmit = async (data) => {
    try {
      if (editingTeam) {
        await updateTeam(editingTeam.id, data);

        alert("Team member updated successfully.");
      } else {
        await createTeam(data);

        alert("Team member created successfully.");
      }

      reset({
        full_name: "",
        role: "member",
        designation: "",
        photo_url: "",
        bio: "",
        display_order: 0,
        role_priority: 1,
        is_active: true,
      });

      setEditingTeam(null);
      setShowModal(false);

      fetchTeams();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  // =======================
  // Delete Team Member
  // =======================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team member?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTeam(id);

      alert("Team member deleted successfully.");

      fetchTeams();
    } catch (err) {
      console.error(err);
      alert("Failed to delete team member.");
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
      <h1 className="text-3xl font-bold">Team Members</h1>

      <button
        onClick={handleAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        + Add Team Member
      </button>
    </div>

    {/* =======================
        Loading
    ======================== */}

    {loading ? (
      <div className="text-center py-10 text-lg">
        Loading team members...
      </div>
    ) : (
      <>
        {/* =======================
            Teams Table
        ======================== */}

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">ID</th>
                <th className="border p-3 text-left">Photo</th>
                <th className="border p-3 text-left">Full Name</th>
                <th className="border p-3 text-left">Role</th>
                <th className="border p-3 text-left">Designation</th>
                <th className="border p-3 text-left">Priority</th>
                <th className="border p-3 text-left">Order</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="border p-6 text-center text-gray-500"
                  >
                    No team members found.
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr key={team.id} className="hover:bg-gray-50">
                    <td className="border p-3">{team.id}</td>

                    <td className="border p-3">
                      {team.photo_url ? (
                        <img
                          src={team.photo_url}
                          alt={team.full_name}
                          className="w-14 h-14 object-cover rounded-full"
                        />
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="border p-3 font-medium">
                      {team.full_name}
                    </td>

                    <td className="border p-3">
                      {team.role
                        .replaceAll("_", " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </td>

                    <td className="border p-3">
                      {team.designation || "-"}
                    </td>

                    <td className="border p-3">
                      {team.role_priority}
                    </td>

                    <td className="border p-3">
                      {team.display_order}
                    </td>

                    <td className="border p-3">
                      {team.is_active ? (
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
                        onClick={() => handleEdit(team)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(team.id)}
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-lg">
          <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {editingTeam ? "Edit Team Member" : "Add Team Member"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Full Name
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

              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Role */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Role
              </label>

              <select
                {...register("role")}
                className="w-full border rounded p-2"
              >
                <option value="chief_advisor">Chief Advisor</option>
                <option value="chief_judge">Chief Judge</option>
                <option value="chairman">Chairman</option>
                <option value="executive_director">
                  Executive Director
                </option>
                <option value="director">Director</option>
                <option value="member">Member</option>
              </select>

              {errors.role && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role.message}
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

            {/* Photo URL */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Photo URL
              </label>

              <input
                type="text"
                {...register("photo_url")}
                className="w-full border rounded p-2"
              />

              {errors.photo_url && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo_url.message}
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
            </div>

            {/* Display Order */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Display Order
              </label>

              <input
                type="number"
                {...register("display_order", {
                  valueAsNumber: true,
                })}
                className="w-full border rounded p-2"
              />
            </div>

            {/* Role Priority */}

            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Role Priority
              </label>

              <input
                type="number"
                {...register("role_priority", {
                  valueAsNumber: true,
                })}
                className="w-full border rounded p-2"
              />

              {errors.role_priority && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.role_priority.message}
                </p>
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
                  setEditingTeam(null);

                  reset({
                    full_name: "",
                    role: "member",
                    designation: "",
                    photo_url: "",
                    bio: "",
                    display_order: 0,
                    role_priority: 1,
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
                {editingTeam
                  ? "Update Team Member"
                  : "Create Team Member"}
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