import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../Utils/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFoods = async () => {
    setLoading(true);
    try {
      // ✅ requirement অনুযায়ী শুধু Available items
      const res = await api.get("/foods", { params: { status: "Available" } });
      setFoods(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching foods:", error);
      toast.error("Failed to load foods");
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();

    // ✅ AddFood success হলে এই event fire হয়, এখানে শুনে refresh করবে
    const handleFoodAdded = () => fetchFoods();
    window.addEventListener("foodAdded", handleFoodAdded);

    return () => {
      window.removeEventListener("foodAdded", handleFoodAdded);
    };
  }, []);

  const filteredFoods = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return foods;

    return foods.filter((food) =>
      (food?.food_name || "").toLowerCase().includes(q)
    );
  }, [foods, searchQuery]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <title>Available Foods | Plateshare</title>

      <div className="text-center mb-8">
        <input
          type="text"
          placeholder="Search available foods..."
          className="input w-full max-w-md border-none rounded-full px-5 py-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredFoods.length === 0 ? (
        <h2 className="text-center text-xl text-gray-500 my-10">
          No matching foods found.
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <div
              key={food?._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={
                  food?.food_image ||
                  "https://i.ibb.co/7WJqz9p/food-placeholder.png"
                }
                alt={food?.food_name || "Food"}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {food?.food_name || "Untitled Food"}
                </h3>

                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={
                      food?.donator_photo ||
                      "https://i.ibb.co/2kRZ3b7/user-placeholder.png"
                    }
                    alt="Donator"
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-sm text-gray-700">
                    Donated by <strong>{food?.donator_name || "Unknown"}</strong>
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Quantity:</strong> {food?.food_quantity ?? "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Pickup Location:</strong>{" "}
                  {food?.pickup_location || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Expire Date:</strong> {food?.expire_date || "N/A"}
                </p>

                <p className="text-sm mb-3">
                  <strong>Status:</strong> {food?.food_status || "N/A"}
                </p>

                <Link
                  to={`/food/${food?._id}`}
                  className="
                    inline-flex items-center justify-center
                    px-6 py-3
                    rounded-full
                    bg-gradient-to-r from-yellow-700 to-yellow-400
                    text-white font-semibold
                    shadow-md shadow-yellow-300/60
                    hover:brightness-110
                    transition
                  "
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;
