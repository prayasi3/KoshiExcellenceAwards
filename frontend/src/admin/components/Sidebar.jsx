import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  FolderOpen,
  Trophy,
  Award,
  Handshake,
  Mic,
  Users,
  Images,
  Newspaper,
  Mail,
  UserCog,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      name: "Editions",
      icon: CalendarDays,
      path: "/admin/editions",
    },
    {
      name: "Categories",
      icon: FolderOpen,
      path: "/admin/categories",
    },
    {
      name: "Recipients",
      icon: Trophy,
      path: "/admin/recipients",
    },
    {
      name: "Honorees",
      icon: Award,
      path: "/admin/honorees",
    },
    {
      name: "Sponsors",
      icon: Handshake,
      path: "/admin/sponsors",
    },
    {
      name: "Speakers",
      icon: Mic,
      path: "/admin/speakers",
    },
    {
      name: "Teams",
      icon: Users,
      path: "/admin/teams",
    },
    {
      name: "Gallery",
      icon: Images,
      path: "/admin/gallery",
    },
    {
      name: "News",
      icon: Newspaper,
      path: "/admin/news",
    },
    {
      name: "Contact Messages",
      icon: Mail,
      path: "/admin/contacts",
    },
    {
      name: "Users",
      icon: UserCog,
      path: "/admin/users",
    },
  ];

  return (
    <aside className="w-72 min-h-screen overflow-y-auto bg-[#0B1F3A] text-white flex flex-col">

      {/* Logo */}

      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">

          <img
            src="/logo.png"
            alt="Logo"
            className="w-12 h-12 object-contain"
          />

          <div>
            <h1 className="font-bold text-lg">
              Koshi Excellence
            </h1>

            <p className="text-xs text-gray-300">
              Admin Panel
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 px-3 py-5 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200

                ${
                  isActive
                    ? "bg-[#C9A84C] text-[#0B1F3A] font-semibold shadow-md"
                    : "hover:bg-white/10 hover:translate-x-1"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="border-t border-white/10 p-4">

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-red-500 transition"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}