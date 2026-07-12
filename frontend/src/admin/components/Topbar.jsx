import { Bell, UserCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/editions": "Editions",
    "/admin/categories": "Categories",
    "/admin/recipients": "Recipients",
    "/admin/honorees": "Honorees",
    "/admin/sponsors": "Sponsors",
    "/admin/speakers": "Speakers",
    "/admin/teams": "Teams",
    "/admin/gallery": "Gallery",
    "/admin/news": "News",
    "/admin/contacts": "Contact Messages",
    "/admin/users": "Users",
  };

  const title = pageTitles[location.pathname] || "Admin";

  const user =
    JSON.parse(localStorage.getItem("user")) || {
      full_name: "Administrator",
    };

  return (
    <header className="bg-white border-b h-20 flex items-center justify-between px-8">

      <div>

        <h1 className="text-2xl font-bold text-[#0B1F3A]">
          {title}
        </h1>

        <p className="text-gray-500 text-sm">
          Admin Dashboard
        </p>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative hover:text-[#C9A84C] transition">

          <Bell size={22} />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={42}
            className="text-[#0B1F3A]"
          />

          <div>

            <p className="font-semibold">
              {user.full_name}
            </p>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}