import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      
      <div className="logo"> 
        <h2>Fretron</h2>
      </div>

      
      <ul className="nav-links">
        <li><Link to="/Dashboard">Dashboard</Link></li>
        <li><Link to="/FindRoute">Find Route</Link></li>
        <li><Link to="/CreateRoute">Create Route</Link></li>
        <li><Link to="/My Bookings">My Bookings</Link></li>
      </ul>

      
      <div className="nav-right">
        <a href="#" className="login">Log In</a>
        <a href="#" className="btn">Get Started</a>
      </div>
    </nav>
  );
}

export default Navbar;