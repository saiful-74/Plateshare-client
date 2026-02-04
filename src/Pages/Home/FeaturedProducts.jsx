import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../Utils/axiosInstance"; // ✅ env-based axios instance

const FeaturedProducts = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseQuantity = (quantityStr) => {
    if (typeof quantityStr === "number") return quantityStr;
    if (!quantityStr) return 0;
    const match = String(quantityStr).match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  useEffect(() => {
    let mounted = true;

    const loadFeatured = async () => {
      try {
        setLoading(true);

        // ✅ use your current API (localhost in dev, vercel in prod)
        const res = await api.get("/foods", { params: { status: "Available" } });
        const data = res.data || [];

        const sortedFoods = [...data]
          .sort((a, b) => parseQuantity(b.food_quantity) - parseQuantity(a.food_quantity))
          .slice(0, 6);

        if (mounted) setFoods(sortedFoods);
      } catch (err) {
        console.error("Featured foods load error:", err?.response?.data || err.message);
        if (mounted) setFoods([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadFeatured();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="my-16 px-6 md:px-10 text-center">
        <p className="text-gray-500">Loading featured foods...</p>
      </section>
    );
  }

  if (!foods.length) {
    return (
      <section className="my-16 px-6 md:px-10 text-center">
        <p className="text-gray-500">No featured foods available.</p>
      </section>
    );
  }

  return (
    <section className="my-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="text-center mb-4">
        <span className="px-4 py-1 bg-orange-100 text-orange-500 rounded-full text-sm font-medium">
          🍛 Featured Foods
        </span>
      </div>

      <h2 className="text-3xl font-bold text-center mb-3">
        Discover our <span className="text-orange-500">Handpicked</span> meals ready
      </h2>

      <p className="text-center text-gray-500 max-w-xl mx-auto mb-14">
        Highlighting the best meals available right now.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => {
          const donatorName = food?.donator_name || food?.donator?.name || "Donator";
          return (
            <div
              key={food._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition"
            >
              <figure>
                <img
                  src={food.food_image}
                  alt={food.food_name}
                  className="h-56 w-full object-cover"
                />
              </figure>

              <div className="card-body">
                {/* ✅ show food name instead of donator_image */}
                <h2 className="card-title">{food.food_name}</h2>

                <p className="text-sm text-gray-500">
                  Donator: <span className="font-medium">{donatorName}</span>
                </p>

                <p className="text-gray-600">Quantity: {food.food_quantity}</p>

                <p className="text-gray-500 text-sm">
                  Location: {food.pickup_location}
                </p>

                <div className="card-actions justify-end">
                  {/* ✅ correct route */}
                  <Link
                    to={`/food/${food._id}`}
                    className="btn bg-neutral-300 hover:bg-amber-400 text-neutral"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Link to="/availableFoods" className="btn btn-outline btn-primary">
          Show All
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
