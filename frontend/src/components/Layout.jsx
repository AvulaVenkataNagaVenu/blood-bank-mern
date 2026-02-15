import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function Layout({ children }) {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Fetch notifications safely
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await API.get("/notifications");
        setNotifications(data);
      } catch (error) {
        console.log("Notification fetch error");
      }
    };

    fetchNotifications();
  }, []);

  // 🔥 Correct Dashboard Path Based on Role
  const dashboardPath =
    role === "Admin"
      ? "/admin-dashboard"
      : role === "Donor"
      ? "/donor-dashboard"
      : "/";

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-red-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Blood Bank</h2>

        <nav className="space-y-4">

          {/* Role-Based Dashboard Link */}
          <Link
            to={dashboardPath}
            className="block p-2 rounded hover:bg-red-500"
          >
            Dashboard
          </Link>

          {role === "Admin" && (
            <>
              <Link
                to="/stock"
                className="block p-2 rounded hover:bg-red-500"
              >
                Blood Stock
              </Link>

              <Link
                to="/requests"
                className="block p-2 rounded hover:bg-red-500"
              >
                Requests
              </Link>
            </>
          )}

          {role === "Hospital" && (
            <Link
              to="/requests"
              className="block p-2 rounded hover:bg-red-500"
            >
              Request Blood
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="w-full text-left p-2 mt-6 bg-red-700 rounded hover:bg-red-800"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            {role} Dashboard
          </h1>

          <div className="flex items-center gap-4">
            {/* Notification Count */}
            <div className="relative">
              🔔
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 rounded-full">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </div>

            <span className="text-gray-600">
              Role: {role}
            </span>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-8 overflow-auto">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;
