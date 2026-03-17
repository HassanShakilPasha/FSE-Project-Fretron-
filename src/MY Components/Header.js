import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ currentUser, onLogout }) {
  const navigate = useNavigate();
  const isTransporter = currentUser?.role === "transporter";

  function handleLogoutClick() {
    onLogout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      
      <div className="logo"> 
        <h2>Fretron</h2>
      </div>

      
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/find-route">Find Route</Link></li>
        {isTransporter && <li><Link to="/create-route">Create Route</Link></li>}
        {isTransporter && <li><Link to="/my-routes">My Routes</Link></li>}
      </ul> 

      
      <div className="nav-right">
        {!currentUser && <li><Link to="/login">Login</Link></li>}
        {!currentUser && <Link to="/login" className="btn">Get Started</Link>}
        {currentUser && <span>{currentUser.name} ({currentUser.role})</span>}
        {currentUser && <button className="btn" onClick={handleLogoutClick}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;