import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import { api } from "../../Utils/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";

const MyFoodRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyRequests = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await api.get("/requests", { params: { email: user.email } });
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      Swal.fire("Failed to load your requests", "", "error");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Food Requests</h2>

      {!requests.length ? (
        <div className="bg-base-200 rounded-xl p-6">
          <p className="text-gray-600">You haven’t requested any food yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Food</th>
                <th>Owner Email</th>
                <th>My Location</th>
                <th>Contact</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((r) => (
                <tr key={r._id}>
                  <td className="font-medium">{r.foodName || "Food item"}</td>
                  <td>{r.ownerEmail || "-"}</td>
                  <td>{r.location || "-"}</td>
                  <td>{r.contact || "-"}</td>

                  <td>
                    <span
                      className={`badge ${
                        r.status === "pending"
                          ? "badge-warning"
                          : r.status === "accepted"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>

                  <td>
                    {r.foodId ? (
                      <Link className="btn btn-sm btn-outline" to={`/food/${r.foodId}`}>
                        Details
                      </Link>
                    ) : (
                      <span className="text-gray-400 text-sm">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequests;
