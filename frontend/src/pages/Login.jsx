import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      // Save token & role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // 🔥 Role-based redirect
      if (data.role === "Admin") {
        navigate("/admin-dashboard");
      } else if (data.role === "Donor") {
        navigate("/donor-dashboard");
      } else if (data.role === "Hospital") {
        navigate("/requests"); // or create hospital dashboard
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-500 to-pink-500">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-96">

        <h2 className="text-3xl font-bold text-center mb-6 text-red-600">
          Blood Bank Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
          >
            Login
          </button>

          <p className="text-center mt-4 text-sm">
            New Donor?{" "}
            <a href="/register" className="text-red-600 font-semibold">
              Register Here
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;
