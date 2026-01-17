import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { googleLogin, loginUser } from "../../Hooks/useAuth";
import { AuthContext } from "../../Context/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const user = await googleLogin();
      setUser(user);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const user = await loginUser(email, password);
      setUser(user);
      toast.success("Logged in successfully!");
setTimeout(() => navigate("/"), 500); 

    } catch (error) {
      toast.error("Login failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };






  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3] px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Login to continue your journey
        </p>

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium py-3 rounded-xl transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-2 border border-gray-300 px-6 py-2 rounded-xl w-full hover:bg-gray-50"
        >
          <FcGoogle className="text-xl" />
          <span>{loading ? "Processing..." : "Sign in with Google"}</span>
        </button>

        <div className="flex justify-between text-xs text-gray-500 mt-6">
          <p>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-gray-800 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
          <Link
            to="/terms"
            className="hover:underline text-gray-700 font-medium"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
