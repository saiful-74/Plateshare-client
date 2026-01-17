import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const parseQuantity = (quantityStr) => {
    if (typeof quantityStr === "number") return quantityStr;
    const match = quantityStr.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  useEffect(() => {
    fetch("https://plateshare-server-mu.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => {
        const sortedFoods = data
          .sort(
            (a, b) =>
              parseQuantity(b.food_quantity) - parseQuantity(a.food_quantity)
          )
          .slice(0, 6);
        setFoods(sortedFoods);
      })
      .catch(() => setFoods([]))
      .finally(() => setLoading(false));
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
        Discover our <span className="text-orange-500">Handpicked</span> meals
        ready
      </h2>
      <p className="text-center text-gray-500 max-w-xl mx-auto mb-14">
        Highlighting the best meals available right now.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
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
              <h2 className="card-title">{food.donator_image}</h2>
              <p className="text-gray-600">Quantity: {food.food_quantity}</p>
              <p className="text-gray-500 text-sm">
                Location: {food.pickup_location}
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={`/food/${food._id}`}
                  className="btn bg-neutral-300 hover:bg-amber-400 text-neutral"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
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
