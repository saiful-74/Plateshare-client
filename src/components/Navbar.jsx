import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // 🌙 Dark mode state
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinkStyle = ({ isActive }) =>
    `relative px-3 py-2 font-bold text-[#ac7800] hover:text-[#8d5751]
     after:absolute after:left-1/2 after:-bottom-1
     after:h-[3px] after:bg-gradient-to-r after:from-amber-900 after:via-orange-300 after:to-rose-900
     after:transition-all after:duration-300 after:ease-out
     after:-translate-x-1/2
     ${isActive
       ? "after:w-full after:h-[3px]"
       : "after:w-0 hover:after:w-full"}`;

  const links = (
    <>
      <NavLink to="/" className={navLinkStyle}>
        Home
      </NavLink>
      <NavLink to="/availableFoods" className={navLinkStyle}>
        Available Foods
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-base-100 text-base-content shadow-sm sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-5 shadow"
          >
            {links}
          </ul>
        </div>

        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          <img
            src="https://i.ibb.co.com/wZLf9dTJ/logo-plateshare.png"
            className="w-16 h-16"
            alt=""
          />
          <span className="font-semibold text-2xl text-[#b48518]">
            PLATESHARE
          </span>
        </NavLink>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-5 font-semibold px-1">
          {links}
        </ul>
      </div>

      <div className="navbar-end flex gap-2">
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="relative w-12 h-12 rounded-full flex items-center justify-center
                     bg-base-200 hover:bg-base-300 shadow-md"
          whileTap={{ scale: 0.85 }}
        >
          <AnimatePresence mode="wait">
            {theme === "light" ? (
              <motion.svg
                key="sun"
                className="w-7 h-7 text-amber-500"
                viewBox="0 0 24 24"
              >
                <path d="M5.64 17.657A9 9 0 1118.36 6.343 9 9 0 015.64 17.657z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="moon"
                className="w-7 h-7 text-sky-400"
                viewBox="0 0 24 24"
              >
                <path d="M21.64 13.64A9 9 0 1110.36 2.36 7 7 0 0021.64 13.64z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

        {!user ? (
          <>
            <NavLink to="/login" className="btn bg-[#ebc15e]">
              Login
            </NavLink>
            <NavLink to="/register" className="btn bg-amber-50">
              Register
            </NavLink>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL || ""} alt="User" />
              </div>
            </div>

            <ul className="mt-3 z-10 p-5 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink to="/addFood">Add Food</NavLink>
              </li>
              <li>
                <NavLink to="/manageMyFoods">Manage My Foods</NavLink>
              </li>
              <li>
                <NavLink to="/myFoodRequests">My Food Request</NavLink>
              </li>
              <li>
                <button onClick={logout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
