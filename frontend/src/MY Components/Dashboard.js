import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard({ currentUser }) {
  const displayRole = currentUser?.role === "admin" ? "admin" : (currentUser?.activeRole || currentUser?.role);

  return (
    <div className="dashboardWrap">
      <h1>Dashboard</h1>
      <p>Welcome, {currentUser?.name}. You are logged in as {displayRole}.</p>

      <div className="dashboardActions">
        <Link to="/find-route">Find Route</Link>
        <Link to="/create-route">Create Route</Link>
        <Link to="/my-routes">My Routes</Link>
      </div>
    </div>
  );
 
}

export default Dashboard;