import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
// {val.data.user.username}
const Navbar = () => {
  const val = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  // console.log(user ? user : null);
  const handleLogout = function () {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
      <a className="navbar-brand">BookNow</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {val ? (
            <>
              <div className="dropdown">
                <button className=" dropbtn btn btn-secondary m-3">
                  {val.data.user.username}
                </button>
                <div className="dropdown-content">
                  <a href="/booking-list">Bookings</a>
                  <a onClick={handleLogout}>Logout</a>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <li className="nav-item active">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
