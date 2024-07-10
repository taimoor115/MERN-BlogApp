import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext/authContext";
import { GrDrawer } from "react-icons/gr";
import { BiLogoBlogger } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    const details = document.querySelector("details[open]");
    if (details) {
      details.removeAttribute("open");
    }
  };

  return (
    <div className="navbar bg-primary text-white h-[80px] sticky top-0 z-50">
      <div className="flex-1">
        <Link
          to="/home"
          className="cursor-pointer text-start p-3 font-extrabold text-xl flex justify-center items-center gap-1"
        >
          <BiLogoBlogger />
          <p>Blogify</p>
        </Link>

        {isLoggedIn && (
          <Link
            to="/blogs/create"
            className="text-sm lg:text-xl md:text-xl font-bold flex items-center  "
          >
            <p>Create Blog</p>
            <BiPlus className="text-2xl ms-0" />
          </Link>
        )}
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal me-5 text-white font-bold">
          <li>
            <details>
              <summary>
                <GrDrawer />
              </summary>
              <ul className="bg-primary rounded-t-none">
                <li className="hover:opacity-70">
                  <Link className="text-white" onClick={handleClick} to="/home">
                    Home
                  </Link>
                </li>
                {isLoggedIn ? (
                  <li className="hover:opacity-70">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link onClick={handleClick} to="/signup">
                        Signup
                      </Link>
                    </li>
                    <li onClick={handleClick}>
                      <Link to="/login">Login</Link>
                    </li>
                  </>
                )}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
