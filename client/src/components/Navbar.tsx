import { Link } from "react-router-dom";

const Navbar = () => {
  const handleClick = () => {
    const details = document.querySelector("details[open]");
    if (details) {
      details.removeAttribute("open");
    }
  };

  return (
    <div className="navbar bg-primary text-white">
      <div className="flex-1">
        <a className="cursor-pointer text-start font-extrabold text-xl">
          Blogify
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Go to</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <Link onClick={handleClick} to="/home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link onClick={handleClick} to="/signup">
                    Signup
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
