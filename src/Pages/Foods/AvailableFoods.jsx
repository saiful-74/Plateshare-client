import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../Utils/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await api.get("/foods"); 
        setFoods(res.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  if (loading) return <LoadingSpinner />;

  const filteredFoods = foods.filter((food) =>
    food.food_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <title>All Foods | Plateshare</title>

      <div className="text-center mb-8">
        <input
          type="text"
          placeholder="Search your foods..."
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
              key={food._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={food.food_image}
                alt={food.food_name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{food.food_name}</h3>

                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={food.donator_photo}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700">
                    Donated by <strong>{food.donator_name}</strong>
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Quantity:</strong> {food.food_quantity}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Pickup Location:</strong> {food.pickup_location}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Expire Date:</strong> {food.expire_date}
                </p>

                
                <p className="text-sm mb-2">
                  <strong>Status:</strong> {food.food_status}
                </p>

                <Link
                  to={`/food/${food._id}`}
                  className="
                    flex items-center gap-3
                    px-6 py-3
                    w-37 h-10
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