import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const statsRes = await API.get("/users/dashboard-stats");
      setStats(statsRes.data);

      const stockRes = await API.get("/blood/all");
      setStockData(stockRes.data);

      const requestRes = await API.get("/requests/all");

      const approved = requestRes.data.filter(r => r.status === "Approved").length;
      const pending = requestRes.data.filter(r => r.status === "Pending").length;
      const rejected = requestRes.data.filter(r => r.status === "Rejected").length;

      setRequestData([
        { name: "Approved", value: approved },
        { name: "Pending", value: pending },
        { name: "Rejected", value: rejected }
      ]);
    };

    fetchData();
  }, []);

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Admin Analytics Dashboard</h2>

      {/* Stat Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg">
            <h3>Total Users</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-xl shadow-lg">
            <h3>Total Donors</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalDonors}</p>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg">
            <h3>Total Hospitals</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalHospitals}</p>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Blood Stock Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Blood Stock</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bloodGroup" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="unitsAvailable" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Request Status Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Request Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={requestData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {requestData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
console.log(import.meta.env.VITE_API_URL);