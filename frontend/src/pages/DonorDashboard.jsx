// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import toast from "react-hot-toast";

// function DonorDashboard() {
//   const [data, setData] = useState(null);
//   const [units, setUnits] = useState("");

//   // Fetch Dashboard Data
//   const fetchDashboard = async () => {
//     try {
//       const response = await API.get("/donation/dashboard");
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching dashboard:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   // Donate Function
//   const handleDonate = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/donation/donate", {
//         units: Number(units)
//       });

//       toast.success("Donation Successful!");
//       setUnits("");

//       // 🔥 Refresh dashboard automatically
//       fetchDashboard();

//     } catch (error) {
//       toast.error("Donation Failed");
//     }
//   };

//   if (!data) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2 className="text-3xl font-bold mb-6">Donor Dashboard</h2>

//       {/* Donate Section */}
//       <div className="bg-white p-6 rounded-xl shadow mb-6">
//         <h3 className="text-xl font-semibold mb-4">Donate Blood</h3>

//         <form onSubmit={handleDonate} className="space-y-4">
//           <input
//             type="number"
//             placeholder="Units"
//             className="w-full border p-2 rounded"
//             value={units}
//             onChange={(e) => setUnits(e.target.value)}
//             required
//           />

//           <button className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">
//             Donate
//           </button>
//         </form>
//       </div>

//       {/* Personal Info */}
//       <div className="bg-white p-6 rounded-xl shadow mb-6">
//         <h3 className="text-xl font-semibold mb-4">Personal Info</h3>
//         <p><strong>Name:</strong> {data.donor.name}</p>
//         <p><strong>Email:</strong> {data.donor.email}</p>
//         <p><strong>Blood Group:</strong> {data.donor.bloodGroup}</p>
//         <p><strong>Phone:</strong> {data.donor.phone}</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 gap-6 mb-6">
//         <div className="bg-green-500 text-white p-6 rounded-xl shadow">
//           <h3>Total Donations</h3>
//           <p className="text-3xl font-bold">{data.totalDonations}</p>
//         </div>

//         <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
//           <h3>Total Units Donated</h3>
//           <p className="text-3xl font-bold">{data.totalUnits}</p>
//         </div>
//       </div>

//       {/* History */}
//       <div className="bg-white rounded-xl shadow overflow-hidden">
//         <h3 className="text-lg font-semibold p-4">Donation History</h3>

//         <table className="w-full text-left">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3">Date</th>
//               <th className="p-3">Blood Group</th>
//               <th className="p-3">Units</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.donations.length === 0 ? (
//               <tr>
//                 <td colSpan="3" className="p-4 text-center">
//                   No donations yet
//                 </td>
//               </tr>
//             ) : (
//               data.donations.map((donation) => (
//                 <tr key={donation._id} className="border-t">
//                   <td className="p-3">
//                     {new Date(donation.date).toLocaleDateString()}
//                   </td>
//                   <td className="p-3">{donation.bloodGroup}</td>
//                   <td className="p-3">{donation.units}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default DonorDashboard;





import { useEffect, useState } from "react";
import API from "../api/axios";

function DonorDashboard() {
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const response = await API.get("/donation/dashboard");
        console.log("API Response:", response.data); // 🔥 DEBUG
        setDonor(response.data.donor);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDonor();
  }, []);

  if (!donor) return <p>Loading donor data...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-red-600">
        Donor Profile
      </h2>

      <div className="space-y-3 text-lg">
        <p><strong>Name:</strong> {donor.name}</p>
        <p><strong>Email:</strong> {donor.email}</p>
        <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
        <p><strong>Phone:</strong> {donor.phone}</p>
        <p><strong>Role:</strong> {donor.role}</p>
      </div>
    </div>
  );
}

export default DonorDashboard;
