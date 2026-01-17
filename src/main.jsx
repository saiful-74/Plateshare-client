
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { AuthProvider } from "./Context/AuthProvider.jsx";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      
      {/* Toast Must Be Inside React */}
      <ToastContainer position="top-center" />
      <Toaster position="top-right" />
    </AuthProvider>
  </StrictMode>
);
