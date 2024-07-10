import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { CgPassword } from "react-icons/cg";
import { BiUserCircle } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext/authContext";

const Signup = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    await axios
      .post("/signup", formData, { withCredentials: true })
      .then(() => {
        toast.success("You have register successfully...");
        setIsLoggedIn(true);
        navigate("/home");
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err.response.data);
        toast.error(err.response.data.error);
      });
  };

  return (
    <form
      className="form-control gap-5 flex items-center justify-center text-white mt-8"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center flex-col items-center gap-5">
        <div className="text-2xl md:text-4xl lg:text-4xl font-bold">
          Sign up
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <BiUserCircle />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </label>

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
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
