import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function AdminLayout() {
  const location = useLocation();
  const mainRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    mainRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
    // Close the mobile sidebar automatically whenever the route changes.
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col min-w-0">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />

        <main
          ref={mainRef}
          className="flex-1 overflow-y-auto"
        >
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}