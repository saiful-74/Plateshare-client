import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../Utils/axiosInstance";

const FoodRequestsTable = ({ foodId, onStatusUpdate }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const fetchRequests = async () => {
    if (!foodId) return;

    try {
      setLoading(true);
      const res = await api.get(`/requests/food/${foodId}`);
      setRequests(res.data || []);
    } catch (err) {
      console.error("Failed to load requests:", err?.response?.data || err.message);
      Swal.fire("Failed to load requests", "", "error");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodId]);

  const acceptRequest = async (requestId) => {
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

      await api.patch(`/requests/${requestId}`, { status: "accepted" });
      await api.patch(`/foods/status/${foodId}`);

      await fetchRequests();
      onStatusUpdate?.("accepted");

      Swal.fire("Accepted", "Request accepted & food marked donated", "success");
    } catch (err) {
      console.error("Failed to accept:", err?.response?.data || err.message);
      Swal.fire("Failed to accept", err?.response?.data?.error || "", "error");
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

      await api.patch(`/requests/${requestId}`, { status: "rejected" });

      await fetchRequests();
      Swal.fire("Rejected", "Request marked as rejected", "success");
    } catch (err) {
      console.error("Failed to reject:", err?.response?.data || err.message);
      Swal.fire("Failed to reject", err?.response?.data?.error || "", "error");
    } finally {
      setProcessingId(null);
    }
  };

  // ✅ Minimal UI fix
  const hasAccepted = requests.some((r) => r.status === "accepted");

  if (loading) return <p>Loading requests...</p>;
  if (!requests.length) return <p>No requests yet for this food.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead className="bg-base-200">
          <tr>
            <th>User</th>
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
                {req.requesterPhoto ? (
                  <img
                    src={req.requesterPhoto}
                    alt={req.requesterName || "User"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                )}

                <div>
                  <div className="font-medium">
                    {req.requesterName || "Unknown"}
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
                  hasAccepted ? (
                    <div className="text-sm text-gray-600">
                      Locked (already donated)
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => acceptRequest(req._id)}
                        disabled={processingId === req._id}
                      >
                        {processingId === req._id ? "..." : "Accept"}
                      </button>

                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => rejectRequest(req._id)}
                        disabled={processingId === req._id}
                      >
                        {processingId === req._id ? "..." : "Reject"}
                      </button>
                    </div>
                  )
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
