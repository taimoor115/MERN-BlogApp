import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./route.tsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/authContext/authContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
