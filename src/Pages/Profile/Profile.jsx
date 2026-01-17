import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [phone, setPhone] = useState("");

  const BACKEND_URL = "https://plateshare-server-mu.vercel.app/users";

  
  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
      setPhone(user.phoneNumber || "");
    }
  }, [user]);

  
  const updateBackendProfile = async (updatedUser) => {
    await fetch(`${BACKEND_URL}/${user.email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in!");

    try {
    
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL,
      });

      const updatedUser = {
        uid: user.uid,
        name,
        email: user.email,
        photoURL,
        phone,
      };

      
      await updateBackendProfile(updatedUser);

      
      setUser({
        ...user,
        displayName: name,
        photoURL,
        phoneNumber: phone,
      });

    
      setName("");
      setPhotoURL("");
      setPhone("");

      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.success("Updated Successfully Reload it!");
    }
  };

  if (!user)
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Please login to access your profile.
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-2xl p-8">
            <title>PROFILE | Plateshare</title>

      <h2 className="text-2xl font-semibold text-center mb-6">My Profile</h2>

      <div className="flex flex-col items-center mb-6">
        <img
          src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover shadow-md"
        />
      </div>

      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-sm mb-1 text-gray-600">Full Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-xl bg-gray-50"
          
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600">Photo URL</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-xl bg-gray-50"
            
            placeholder="Photo URL"
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600">Phone Number</label>
          <input
            type="text"
            className="w-full px-4 py-3 border rounded-xl bg-gray-50"
            placeholder="+8801XXXXXXXXX"
        
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600">Email (Read Only)</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full px-4 py-3 border rounded-xl bg-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded-xl"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;


