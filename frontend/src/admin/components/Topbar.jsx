import { Bell, UserCircle, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Topbar({ onMenuClick = () => {} }) {
  const location = useLocation();

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/editions": "Editions",
    "/admin/categories": "Categories",
    "/admin/recipients": "Awarded",
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
      full_name: "User",
    };

  return (
    <header className="bg-white border-b h-20 flex items-center justify-between px-4 sm:px-8">

      <div className="flex items-center gap-3 min-w-0">

        {/* Hamburger — mobile only, opens the sidebar drawer */}
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 text-[#0B1F3A] hover:bg-gray-100 md:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold text-[#0B1F3A] sm:text-2xl">
            {title}
          </h1>

          <p className="hidden text-sm text-gray-500 sm:block">
            {user.email}
          </p>
        </div>

      </div>

      <div className="flex items-center gap-3 sm:gap-6">

        <button className="relative hover:text-[#C9A84C] transition">

          <Bell size={22} />

          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={42}
            className="text-[#0B1F3A]"
          />

          <div className="hidden sm:block">

            <p className="font-semibold">
              {user.full_name}
            </p>

            <p className="text-sm text-gray-500">
              Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}