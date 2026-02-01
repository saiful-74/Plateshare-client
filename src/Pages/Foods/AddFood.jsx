import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Please login first!");
      return;
    }

    const form = e.target;

    const foodData = {
      food_name: form.foodName.value.trim(),
      food_image: form.foodImage.value.trim(),
      food_quantity: Number(form.foodQuantity.value),
      pickup_location: form.pickupLocation.value.trim(),
      expire_date: form.expireDate.value,
      additional_notes: form.additionalNotes.value?.trim() || "",
      food_status: "Available",
      donator_name: user?.displayName || "Unknown",
      donator_email: user?.email,
      donator_photo: user?.photoURL || "",
    };

    if (!foodData.food_name || !foodData.food_image || !foodData.pickup_location) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);

      // ✅ Direct fetch to LOCAL backend
      const res = await fetch("http://localhost:3000/add-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(foodData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Server error response:", data);
        toast.error(data?.message || "Failed to add food (server error)");
        return;
      }

      if (data?.insertedId) {
        toast.success("Food added successfully!");
        form.reset();
        window.dispatchEvent(new Event("foodAdded"));
      } else {
        toast.error("Food not added (no insertedId returned).");
        console.log("Response:", data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to add food (network error)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-xl shadow-lg">
      <title>Add Food | Plateshare</title>

      <h2 className="text-3xl font-bold text-center mb-8">Add New Food</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="font-medium">Food Name :</label>
            <input type="text" name="foodName" className="input input-bordered w-full" required />
          </div>

          <div className="space-y-2">
            <label className="font-medium">Food URL :</label>
            <input type="url" name="foodImage" className="input input-bordered w-full" required />
          </div>

          <div className="space-y-2">
            <label className="font-medium">Food Quantity :</label>
            <input type="number" name="foodQuantity" min="1" className="input input-bordered w-full" required />
          </div>

          <div className="space-y-2">
            <label className="font-medium">Pickup Location :</label>
            <input type="text" name="pickupLocation" className="input input-bordered w-full" required />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="font-medium">Expire Date :</label>
            <input type="date" name="expireDate" className="input input-bordered w-full" required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-medium">Additional Notes :</label>
          <textarea name="additionalNotes" className="textarea textarea-bordered w-full h-28" rows="4"></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-success cursor-pointer w-full text-amber-300 text-lg"
        >
          {loading ? "Adding..." : "Add Food"}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
