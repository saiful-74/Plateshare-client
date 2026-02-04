import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import FoodRequestsTable from "./FoodRequestsTable";
import { api } from "../../Utils/axiosInstance"; // ✅ use your axios instance

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [reasonInput, setReasonInput] = useState("");
  const [contactInput, setContactInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch food details
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api
      .get(`/foods/${id}`)
      .then((res) => {
        if (isMounted) setFood(res.data);
      })
      .catch((err) => {
        console.error("FoodDetails GET error:", err?.response?.data || err.message);
        if (isMounted) setFood(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!food) return <p className="text-center py-20">Food not found.</p>;

  // Support both API shapes (donator nested OR flat)
  const donatorEmail = food?.donator_email || food?.donator?.email || "";
  const donatorName = food?.donator_name || food?.donator?.name || "";

  // Normalize status (Available / Donated)
  const rawStatus = food?.food_status || "Available";
  const foodStatus = String(rawStatus).toLowerCase(); // "available" | "donated"

  const {
    food_name,
    food_image,
    food_quantity,
    pickup_location,
    expire_date,
    additional_notes,
  } = food;

  // Open request modal
  const openModal = () => {
    if (!user?.email) {
      Swal.fire("Please login first!", "", "info");
      navigate("/login");
      return;
    }

    if (foodStatus === "donated") {
      Swal.fire("This food is already donated.", "", "warning");
      return;
    }

    setLocationInput("");
    setReasonInput("");
    setContactInput("");
    setOpenRequestModal(true);
  };

  // Submit request
  const submitRequest = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      Swal.fire("Please login first!", "", "info");
      return;
    }

    if (!locationInput.trim() || !reasonInput.trim() || !contactInput.trim()) {
      Swal.fire("Please fill all fields.", "", "warning");
      return;
    }

    const requestData = {
      foodId: id,

      // requester info
      requesterEmail: user.email,
      requesterName: user.displayName || "Anonymous",
      requesterPhoto: user.photoURL || "",

      // form fields
      location: locationInput.trim(),
      reason: reasonInput.trim(),
      contact: contactInput.trim(),

      // helpful extra fields (optional)
      ownerEmail: donatorEmail,
      foodName: food_name,
    };

    try {
      setSubmitting(true);

      const res = await api.post("/requests", requestData);

      if (res?.data?.insertedId || res?.data?.acknowledged) {
        Swal.fire("Request sent!", "Your request is pending approval.", "success");
        setOpenRequestModal(false);
      } else {
        Swal.fire("Request failed", "Unexpected server response.", "error");
      }
    } catch (err) {
      console.error("Request POST error:", err?.response?.data || err.message);
      Swal.fire(
        "Request failed",
        err?.response?.data?.error || "Try again later.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={food_image}
          alt={food_name}
          className="rounded-xl w-full h-80 object-cover shadow-lg"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{food_name}</h1>

          <p className="text-gray-700 mb-2">
            <strong>Quantity:</strong> {food_quantity}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Pickup:</strong> {pickup_location}
          </p>

          <p className="text-gray-700 mb-2">
            <strong>Expire Date:</strong> {expire_date}
          </p>

          <p className="text-gray-700 mt-3">{additional_notes}</p>

          <div className="bg-gray-50 p-4 rounded-lg border mt-6">
            <h3 className="font-semibold mb-1">Food Donator</h3>
            <p>Name: {donatorName}</p>
            <p>Email: {donatorEmail}</p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={openModal}
              className={`px-6 py-3 rounded-lg shadow text-white ${
                foodStatus === "donated"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-600 hover:bg-yellow-700"
              }`}
              disabled={foodStatus === "donated"}
            >
              Request This Food
            </button>

            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                foodStatus === "available"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {foodStatus === "available" ? "Available" : "Donated"}
            </span>
          </div>
        </div>
      </div>

      {/* Donator view: requests table */}
      {user?.email === donatorEmail && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Food Requests</h2>
          <FoodRequestsTable
            foodId={id}
            onStatusUpdate={(newStatus) => {
              if (String(newStatus).toLowerCase() === "accepted") {
                setFood((prev) => ({ ...prev, food_status: "Donated" }));
              }
            }}
          />
        </div>
      )}

      {/* Request Modal */}
      {openRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-md rounded-lg p-6 mx-4">
            <h3 className="text-lg font-semibold mb-3">Request Food</h3>

            <form onSubmit={submitRequest} className="space-y-3">
              <div>
                <label className="text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="input input-bordered w-full mt-1"
                  placeholder="Where should we deliver / pickup?"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Why Need Food</label>
                <textarea
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  className="textarea textarea-bordered w-full mt-1"
                  rows={4}
                  placeholder="Briefly explain why you need the food"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">Contact No.</label>
                <input
                  type="text"
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  className="input input-bordered w-full mt-1"
                  placeholder="Phone number / WhatsApp"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setOpenRequestModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
