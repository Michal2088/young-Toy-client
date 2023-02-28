import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { successMsg } from "../services/feedbacksService";
import { getIsAdmin } from "../services/userService";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    successMsg("you logged out!bye bye:)");
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary FloatingNavbar sticky-top rounded-pill">
        <div className="container-fluid">
          <NavLink className="nav-link m-2" aria-current="page" to={"/"}>
            <div className="d-none d-md-block">
              <img
                src="images/logo michal (1).png"
                alt=""
                width={"250rem"}
                className="logo"
              />
            </div>
            <div className="d-block d-md-none">
              <img src="images/לוגו מיכל (1).png" alt="logo-YoungToy" width={"100rem"} />
            </div>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {getIsAdmin() ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link m-2  text-light"
                    aria-current="page"
                    to={"/UserManagement"}
                  >
                    UserManagement
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink
                    className="nav-link m-2 text-light"
                    aria-current="page"
                    to={"/about"}
                  >
                    About
                  </NavLink>
                </li>
              )}
              <li className="nav-item mx-1">
                <NavLink
                  className="nav-link m-2 text-light"
                  aria-current="page"
                  to={"/storContainer"}
                >
                  To the store
                </NavLink>
              </li>
            </ul>

            {getIsAdmin() ? (
              <Link
                className="nav-item nav-link mx-4 mt-3"
                aria-current="page"
                to={"/MessagesFromUsers"}
              >
                <i className="fa-solid fa-envelope fs-3"></i>
              </Link>
            ) : (
              <Link
                className="nav-item nav-link mx-4 mt-3"
                aria-current="page"
                to={"/cart"}
              >
                <i className="fa-solid fa-cart-shopping fs-3"></i>
              </Link>
            )}
            <div className="nav-item mx-1 mt-3">
              <Link className="nav-link mx-4" aria-current="page" to={"/login"}>
                <i className="fa-solid fa-user fs-3"></i>
              </Link>
            </div>
            {localStorage.getItem("token") ? (
              <div
                onClick={handleLogout}
                className="nav-item nav-link mx-4 mt-3"
              >
                <i className="fa-solid fa-arrow-right-from-bracket fs-3"></i>
              </div>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
