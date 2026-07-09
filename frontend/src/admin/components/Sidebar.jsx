import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Users", path: "/admin/users" },
  { name: "Categories", path: "/admin/categories" },
  { name: "Editions", path: "/admin/editions" },
  { name: "Recipients", path: "/admin/recipients" },
  { name: "Honorees", path: "/admin/honorees" },
  { name: "Gallery", path: "/admin/gallery" },
  { name: "Sponsors", path: "/admin/sponsors" },
  { name: "Speakers", path: "/admin/speakers" },
  { name: "Team", path: "/admin/team" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6 text-xl font-bold border-b border-slate-700">
        KEA Admin
      </div>

      <nav className="flex flex-col p-4 gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-4 py-3 rounded transition ${
                isActive
                  ? "bg-yellow-500 text-black font-semibold"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}