import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from "./context/authContext/authContext";
import Navbar from "./components/Navbar";
import CreateBlog from "./pages/CreateBlog";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs/create" element={<CreateBlog />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
