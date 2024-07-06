import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { CgPassword } from "react-icons/cg";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = () => {};

  return (
    <form className="form-control gap-5  flex items-center justify-center text-white mt-8">
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
            />
          </label>
        </div>

        <div>
          <button
            className="btn text-white btn-primary btn-wide flex justify-center"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
