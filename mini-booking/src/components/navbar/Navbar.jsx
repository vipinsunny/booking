import React from 'react'
import { Link } from "react-router-dom";
import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Redbooking</span>
        </Link>
      </div>
    </div>
  );
}

export default Navbar
