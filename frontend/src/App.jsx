import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Admin
import DonorDashboard from "./pages/DonorDashboard";
import BloodStock from "./pages/BloodStock";
import Requests from "./pages/Requests";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Donor Dashboard */}
        <Route
          path="/donor-dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DonorDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Blood Stock (Admin Only) */}
        <Route
          path="/stock"
          element={
            <ProtectedRoute>
              <Layout>
                <BloodStock />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Requests */}
        <Route
          path="/requests"
          element={
            <ProtectedRoute>
              <Layout>
                <Requests />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
