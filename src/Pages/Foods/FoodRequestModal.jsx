import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";

const FoodRequestModal = ({ food, onClose }) => {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    location: "",
    reason: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      userEmail: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      foodId: food._id,
      location: form.location,
      reason: form.reason,
      contact: form.contact,
      status: "pending",
    };

    fetch("https://plateshare-server-mu.vercel.app/food-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("✅ Food request sent successfully!");
          onClose();
        }
      })
      .catch((err) => console.error("❌ Request Failed:", err));
  };

  return (
    <dialog open className="modal">
      <form onSubmit={handleSubmit} className="modal-box space-y-3">
        <h3 className="font-bold text-lg text-center">Request This Food</h3>

        <input
          name="location"
          type="text"
          placeholder="Your location"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />

        <textarea
          name="reason"
          placeholder="Why do you need this food?"
          className="textarea textarea-bordered w-full"
          onChange={handleChange}
          required
        ></textarea>

        <input
          name="contact"
          type="text"
          placeholder="Contact number"
          className="input input-bordered w-full"
          onChange={handleChange}
          required
        />

        <div className="modal-action justify-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button onClick={onClose} type="button" className="btn">
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default FoodRequestModal;
