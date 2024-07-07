import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
