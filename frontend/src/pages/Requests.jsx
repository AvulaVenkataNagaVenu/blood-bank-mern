import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Requests() {
  const role = localStorage.getItem("role");

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const [bloodGroup, setBloodGroup] = useState("");
  const [unitsRequired, setUnitsRequired] = useState("");

  const itemsPerPage = 5;

  const fetchRequests = async () => {
    try {
      const { data } = await API.get("/requests/all");
      setRequests(data);
    } catch {
      toast.error("Error fetching requests");
    }
  };

  useEffect(() => {
    if (role === "Admin") fetchRequests();
  }, []);

  // ---------------- HOSPITAL SUBMIT ----------------
  const handleCreateRequest = async (e) => {
    e.preventDefault();

    try {
      await API.post("/requests/create", {
        hospitalName: "City Hospital",
        bloodGroup,
        unitsRequired: Number(unitsRequired),
      });

      toast.success("Request submitted successfully!");
      setBloodGroup("");
      setUnitsRequired("");
    } catch {
      toast.error("Submission failed");
    }
  };

  // ---------------- ADMIN ACTIONS ----------------
  const confirmAction = async (id, action) => {
    if (!window.confirm(`Are you sure you want to ${action}?`)) return;

    try {
      await API.put(`/requests/${action}/${id}`);
      toast.success(`Request ${action} successfully`);
      fetchRequests();
    } catch {
      toast.error("Action failed");
    }
  };

  // ---------------- FILTER + PAGINATION ----------------
  const filteredRequests = requests
    .filter((req) =>
      req.hospitalName.toLowerCase().includes(search.toLowerCase())
    )
    .filter((req) =>
      filter === "All" ? true : req.status === filter
    );

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedData = filteredRequests.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Blood Requests</h2>

      {/* ---------------- HOSPITAL VIEW ---------------- */}
      {role === "Hospital" && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-center">
            Request Blood
          </h3>

          <form onSubmit={handleCreateRequest} className="space-y-4">
            <input
              type="text"
              placeholder="Blood Group"
              className="w-full border p-2 rounded"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Units Required"
              className="w-full border p-2 rounded"
              value={unitsRequired}
              onChange={(e) => setUnitsRequired(e.target.value)}
              required
            />

            <button className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition">
              Submit Request
            </button>
          </form>
        </motion.div>
      )}

      {/* ---------------- ADMIN VIEW ---------------- */}
      {role === "Admin" && (
        <>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Search hospital..."
              className="border p-2 rounded w-1/3"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="border p-2 rounded"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Hospital</th>
                  <th className="p-3">Blood Group</th>
                  <th className="p-3">Units</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((req) => (
                  <tr key={req._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{req.hospitalName}</td>
                    <td className="p-3">{req.bloodGroup}</td>
                    <td className="p-3">{req.unitsRequired}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-white ${
                          req.status === "Approved"
                            ? "bg-green-500"
                            : req.status === "Rejected"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {req.status === "Pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              confirmAction(req._id, "approve")
                            }
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              confirmAction(req._id, "reject")
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Requests;
