import { useEffect, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

function BloodStock() {
  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  const [bloodGroup, setBloodGroup] = useState("");
  const [units, setUnits] = useState("");
  const [stock, setStock] = useState([]);

  const fetchStock = async () => {
    try {
      const { data } = await API.get("/blood/all");
      setStock(data);
    } catch {
      toast.error("Error fetching stock");
    }
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bloodGroup) {
      toast.error("Please select blood group");
      return;
    }

    try {
      await API.post("/blood/update", {
        bloodGroup,
        units: Number(units),
      });

      toast.success("Stock Updated Successfully");
      setUnits("");
      fetchStock();
    } catch {
      toast.error("Error updating stock");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">
        Blood Stock Management
      </h2>

      {/* Update Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 max-w-xl">
        <h3 className="text-xl font-semibold mb-4">
          Update Blood Stock
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Dropdown Instead of Input */}
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full border p-3 rounded focus:ring-2 focus:ring-red-400"
            required
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Units"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            className="w-full border p-3 rounded focus:ring-2 focus:ring-red-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700 transition"
          >
            Update Stock
          </button>
        </form>
      </div>

      {/* Stock Display */}
      <h3 className="text-2xl font-semibold mb-6">
        Available Stock
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stock.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-bold text-red-600">
                {item.bloodGroup}
              </h4>
              {item.unitsAvailable < 5 && (
                <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full">
                  Low Stock
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-2">
              Units Available
            </p>

            <p
              className={`text-4xl font-bold ${
                item.unitsAvailable < 5
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {item.unitsAvailable}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BloodStock;
