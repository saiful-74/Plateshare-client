import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { registerUser, googleLogin } from "../../Hooks/useAuth";
import { AuthContext } from "../../Context/AuthProvider";
import { updateProfile, getAuth } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";


const SuccessPopup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 1400);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 animate-bounce">
        <p className="text-2xl font-bold text-green-600">{message}</p>
      </div>
    </div>
  );
};

const Register = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photoURL = form.photoURL.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

  
    if (!name) return toast.error("Name is required!", { position: "top-center" });
    if (!email) return toast.error("Email is required!", { position: "top-center" });
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters long.", {
        position: "top-center",
      });
    if (!/[A-Z]/.test(password))
      return toast.error("Password must contain at least one uppercase letter.", {
        position: "top-center",
      });
    if (!/[a-z]/.test(password))
      return toast.error("Password must contain at least one lowercase letter.", {
        position: "top-center",
      });

    try {
      
      const userCredential = await registerUser(email, password);
      const firebaseUser = userCredential.user;

      
      await updateProfile(firebaseUser, {
        displayName: name,
        photoURL: photoURL || null,
      });

  
      await firebaseUser.reload();

    
      const auth = getAuth();
      const updatedUser = auth.currentUser;

      
      setUser(updatedUser);

  
      toast.success("Registered Successfully!", { position: "top-center" });
      setShowSuccess(true);

      
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed. Please try again.";

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, { position: "top-center" });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      setUser(result.user); 
      toast.success("Logged in with Google!", { position: "top-center" });
      navigate("/");
    } catch (error) {
      toast.error("Google login failed: " + error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create an account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
        
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full name</label>
            <input
              type="text"
              name="name"
              placeholder="Amélie Laurent"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

        
          <div>
            <label className="block text-sm text-gray-600 mb-1">Photo URL (optional)</label>
            <input
              type="url"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

        
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

    
          <div className="relative">
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 pr-12"
              required
            />
            <button
              type="button"
              className="absolute right-4 top-[42px] text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </button>
          </div>

        
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-3 rounded-xl transition-all duration-200"
          >
            Register
          </button>
        </form>

      
        <div className="my-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/70 text-gray-500">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-4 flex items-center justify-center gap-3 w-full border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 transition"
          >
            <FcGoogle size={22} />
            <span className="font-medium">Sign up with Google</span>
          </button>
        </div>

      
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-6 gap-2">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-gray-800 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
          <Link to="/terms" className="hover:underline text-gray-700 font-medium">
            Terms & Conditions
          </Link>
        </div>

    
        {showSuccess && (
          <SuccessPopup
            message="Registered Successfully! 🎉"
            onClose={() => setShowSuccess(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Register;

