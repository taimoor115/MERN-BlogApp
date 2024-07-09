import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext/authContext";
import { GrDrawer } from "react-icons/gr";
import { BiLogoBlogger } from "react-icons/bi";
const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  // console.log(isLoggedIn);
  console.log(isLoggedIn);

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
    <div className="navbar bg-primary text-white sticky top-0 ">
      <div className="flex-1">
        <Link
          to="/home"
          className="cursor-pointer text-start font-extrabold text-xl flex justify-center items-center gap-1"
        >
          <BiLogoBlogger />
          <p>Blogify</p>
        </Link>
      </div>

      <div className="flex-none">
        {/* <button className="btn btn-ghost" onClick={handleLogout}>
          Logout
        </button> */}
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
