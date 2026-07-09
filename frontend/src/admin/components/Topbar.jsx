import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-slate-800">
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold">{user?.full_name}</p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>

        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}