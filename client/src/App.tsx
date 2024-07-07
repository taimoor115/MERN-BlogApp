import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext/authContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
