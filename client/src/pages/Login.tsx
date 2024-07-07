import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext/authContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", formData, {
        withCredentials: true,
      })
      .then(() => {
        toast.success("Login Successfully...");
        setIsLoggedIn(true);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoggedIn(false);
        toast.error(err.response.data.error);
      });
  };

  return (
    <form
      className="form-control gap-5  flex items-center justify-center text-white mt-8"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center flex-col items-center gap-5">
        <div className="text-2xl md:text-4xl lg:text-4xl font-bold">
          Sign in
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <MdEmail />
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <CgPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </label>
        </div>

        <div>
          <button
            className="btn text-white btn-primary btn-wide flex justify-center"
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
