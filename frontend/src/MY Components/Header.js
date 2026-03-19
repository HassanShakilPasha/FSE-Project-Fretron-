import React from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ currentUser, onLogout, onToggleRole }) {
  const navigate = useNavigate();
  const displayRole = currentUser?.activeRole || currentUser?.role;
  const userLabel = currentUser?.role === "admin"
    ? ""
    : `${currentUser?.name} (${displayRole})`;
  const canToggleRole = currentUser && currentUser.role !== "admin";

  async function handleLogoutClick() {
    await onLogout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      
      <div className="logo"> 
        <Link to="/">
          <h2>Fretron</h2>
        </Link>
      </div>

      
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/find-route">Find Route</Link></li>
        <li><Link to="/create-route">Create Route</Link></li>
        <li><Link to="/my-routes">My Routes</Link></li>
      </ul> 

      
      <div className="nav-right">
        {!currentUser && <Link to="/login" className="btn loginBtn">Login</Link>}
        {!currentUser && <Link to="/login" className="btn">Get Started</Link>}
        {currentUser && userLabel && <span>{userLabel}</span>}
        {currentUser?.role === "admin" && (
          <button className="btn adminBtn" type="button">Admin</button>
        )}
        {canToggleRole && (
          <button className="btn" onClick={onToggleRole}>
            Switch to {displayRole === "transporter" ? "Business" : "Transporter"}
          </button>
        )}
        {currentUser && <button className="btn logoutBtn" onClick={handleLogoutClick}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;