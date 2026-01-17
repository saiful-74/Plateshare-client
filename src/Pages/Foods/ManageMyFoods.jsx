import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyFoods = async () => {
    if (!user?.email) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `https://plateshare-server-mu.vercel.app/my-foods?email=${user.email}`
      );
      setFoods(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyFoods();

    const handleFoodAdded = () => {
      fetchMyFoods();
    };

    window.addEventListener("foodAdded", handleFoodAdded);

    return () => {
      window.removeEventListener("foodAdded", handleFoodAdded);
    };
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios.delete(
          `https://plateshare-server-mu.vercel.app/foods/${id}`
        );
        if (res.data.deletedCount > 0) {
          setFoods(foods.filter((f) => f._id !== id));
          Swal.fire("Deleted!", "Food removed successfully", "success");
        }
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
      additional_notes: form.additional_notes.value,
    };

    try {
      const res = await axios.put(
        `https://plateshare-server-mu.vercel.app/foods/${selectedFood._id}`,
        updatedData
      );

      if (res.data.modifiedCount > 0) {
        setFoods(
          foods.map((f) =>
            f._id === selectedFood._id ? { ...f, ...updatedData } : f
          )
        );
        setSelectedFood(null);
        Swal.fire("Updated!", "Food updated successfully", "success");
        window.dispatchEvent(new Event("foodAdded"));
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update", "error");
    }
  };

  if (loading)
    return <div className="text-center py-10">Loading your foods...</div>;

  return (
    <div className="max-w-6xl mx-auto my-12 px-4">
            <title>Manage Foods | Plateshare</title>

      <h2 className="text-3xl font-bold text-center mb-10">Manage My Foods</h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500 text-xl">
          You haven't added any food yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200">
                <th>Image</th>
                <th>Food Name</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id}>
                  <td>
                    <img
                      src={food.food_image}
                      alt=""
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="font-medium">{food.food_name}</td>
                  <td>{food.food_quantity}</td>
                  <td>{food.pickup_location}</td>
                  <td>{new Date(food.expire_date).toLocaleDateString()}</td>
                  <td>
                    <span className="badge badge-success text-white">
                      {food.food_status}
                    </span>
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => setSelectedFood(food)}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedFood && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-xl mb-4">Update Food</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                name="food_name"
                defaultValue={selectedFood.food_name}
                className="input input-bordered w-full"
                required
              />
              <input
                name="food_image"
                defaultValue={selectedFood.food_image}
                className="input input-bordered w-full"
                required
              />
              <input
                name="food_quantity"
                type="number"
                defaultValue={selectedFood.food_quantity}
                className="input input-bordered w-full"
                required
              />
              <input
                name="pickup_location"
                defaultValue={selectedFood.pickup_location}
                className="input input-bordered w-full"
                required
              />
              <input
                name="expire_date"
                type="date"
                defaultValue={selectedFood.expire_date.split("T")[0]}
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="additional_notes"
                defaultValue={selectedFood.additional_notes || ""}
                className="textarea textarea-bordered w-full"
                rows="3"
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-success text-white">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFood(null)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageMyFoods;
