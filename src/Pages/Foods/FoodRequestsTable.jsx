import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const API = "http://localhost:3000";

const FoodRequestsTable = ({ foodId, onStatusUpdate }) => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (!foodId) return;
    setLoading(true);
    axios
      .get(`${API}/food-requests/${foodId}`)
      .then((res) => {
        const list = (res.data || []).map((r) => ({
          ...r,

          requesterName: r.requesterName || r.name || r.requester_name || "",
          requesterEmail:
            r.requesterEmail || r.requester_email || r.email || "",
          requesterPhoto:
            r.requesterPhoto || r.requester_photo || r.photoURL || "",
        }));
        setRequests(list);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Failed to load requests", "", "error");
      })
      .finally(() => setLoading(false));
  }, [foodId]);

  const acceptRequest = async (requestId) => {
    if (!user) {
      Swal.fire("Login required", "", "info");
      return;
    }

    const confirm = await Swal.fire({
      title: "Accept request?",
      text: "Accepting will mark this request as accepted and mark the food as donated.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, accept",
    });

    if (!confirm.isConfirmed) return;

    try {
      setProcessingId(requestId);
      const res = await axios.put(`${API}/request/accept/${requestId}`, {
        foodId,
      });

      setRequests((prev) =>
        prev.map((r) =>
          r._id === requestId ? { ...r, status: "accepted" } : r
        )
      );

      if (onStatusUpdate) onStatusUpdate("accepted");

      Swal.fire(
        "Accepted",
        "Request accepted & food marked donated",
        "success"
      );
    } catch (err) {
      console.error(err);
      Swal.fire("Failed to accept", "", "error");
    } finally {
      setProcessingId(null);
    }
  };

  const rejectRequest = async (requestId) => {
    const confirm = await Swal.fire({
      title: "Reject request?",
      text: "This will mark the request as rejected.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
    });

    if (!confirm.isConfirmed) return;

    try {
      setProcessingId(requestId);
      const res = await axios.put(`${API}/request/reject/${requestId}`);

      setRequests((prev) =>
        prev.map((r) =>
          r._id === requestId ? { ...r, status: "rejected" } : r
        )
      );

      Swal.fire("Rejected", "Request marked as rejected", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Failed to reject", "", "error");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <p>Loading requests...</p>;
  if (requests.length === 0) return <p>No requests yet for this food.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead className="bg-base-200">
          <tr>
            {/* <th>User</th> */}
            <th>Location</th>
            <th>Reason</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="flex items-center gap-2">
                <img
                  src={req.requesterPhoto || req.photoURL || ""}
                  alt={req.requesterName || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium">
                    {req.requesterName || req.name || "Unknown"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {req.requesterEmail || ""}
                  </div>
                </div>
              </td>

              <td>{req.location || "-"}</td>
              <td style={{ maxWidth: 240 }}>{req.reason || "-"}</td>
              <td>{req.contact || "-"}</td>

              <td>
                <span
                  className={`badge ${
                    req.status === "pending"
                      ? "badge-warning"
                      : req.status === "accepted"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {req.status}
                </span>
              </td>

              <td>
                {req.status === "pending" ? (
                  <div className="flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => acceptRequest(req._id)}
                      disabled={processingId === req._id}
                    >
                      Accept
                    </button>

                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => rejectRequest(req._id)}
                      disabled={processingId === req._id}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600">No actions</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodRequestsTable;
