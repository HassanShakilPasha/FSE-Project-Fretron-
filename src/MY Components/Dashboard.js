import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard({ currentUser }) {
  return (
    <div className="dashboardWrap">
      <h1>Dashboard</h1>
      <p>Welcome, {currentUser?.name}. You are logged in as {currentUser?.role}.</p>

      <div className="dashboardActions">
        <Link to="/find-route">Find Route</Link>
        {currentUser?.role === "transporter" && <Link to="/create-route">Create Route</Link>}
        {currentUser?.role === "transporter" && <Link to="/my-routes">My Routes</Link>}
      </div>
    </div>
  );
 
}

export default Dashboard;