import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/upload">Upload Leads</Link>
        </li>
        <li>
          <Link to="/tracker">Upload Tracker</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
