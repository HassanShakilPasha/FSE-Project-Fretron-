import React from "react";
import "./My Bookings.css";
import { Link } from "react-router-dom";
import { getRoutesByTransporter } from "../utils/storage";

export default function MyBookings({ currentUser }) {
    const routes = React.useMemo(() => {
        if (!currentUser) {
            return [];
        }

        return getRoutesByTransporter(currentUser.id);
    }, [currentUser]);

    const totalCapacity = routes.reduce((sum, route) => sum + Number(route.availableCapacity || 0), 0);
    const averagePrice =
        routes.length > 0
            ? routes.reduce((sum, route) => sum + Number(route.pricePerKg || 0), 0) / routes.length
            : 0;

  return (
        <div className="myBookingsPage">
      <div className="top">
            <h1>
                        My Routes
            </h1>

            <p>
                                Manage all routes posted by your transporter account
            </p>
      </div>

      <div className="grid1">
            <div className="box">
                <div className="b1">
                    <p>
                        My Routes
                    </p>

                    <div className="vari">
                        <p>
                            {routes.length}
                        </p>
                    </div>
                </div>
            </div>

             <div className="box">
                <div className="b1">
                    <p>
                        Total Capacity
                    </p>

                    <div className="vari">
                        <p>
                            {totalCapacity} tons
                        </p>
                    </div>
                </div>
            </div>

             <div className="box">
                <div className="b1">
                    <p>
                        Available
                    </p>

                    <div className="vari">
                        <p>
                            {routes.length}
                        </p>
                    </div>
                </div>
            </div>


             <div className="box">
                <div className="b1">
                    <p>
                        Avg Price
                    </p>

                    <div className="vari1">
                        <p>
                            ${averagePrice.toFixed(2)}/kg
                        </p>
                    </div>
                </div>
            </div>

        </div>

        <div className="quick">
            <p>
                Quick Actions
            </p>

        

                <div className="qgrid">

                    <Link id="b" to="/find-route">Find Route</Link>
                    <Link id="b" to="/create-route">Create Route</Link>
                    <Link id="b" to="/my-routes">Refresh My Routes</Link>
                    <Link id="b" to="/dashboard">Go to Dashboard</Link>

                </div>
            
            </div>


            <div className="view">


                <div className="panel">

                    <div className="panelHeader">
                        <p className="title">My Routes</p>
                                                <p className="viewAll">{routes.length} total</p>
                    </div>

                                        {routes.length === 0 && (
                                            <div className="card">
                                                <p>You have not posted any route yet.</p>
                                                <p className="viewAll"><Link to="/create-route">Post your first route</Link></p>
                                            </div>
                                        )}

                                        {routes.map((route) => (
                                            <div className="card" key={route.id}>
                                                <div className="cardTop">
                                                    <span className="tag">{route.vehicleType || "Transport Route"}</span>
                                                    <span className="status">{route.status}</span>
                                                </div>

                                                <p className="route">{route.source} → {route.destination}</p>

                                                <div className="cardBottom">
                                                    <span>📅 {route.departureDate}</span>
                                                    <span className="price">${route.pricePerKg}/kg</span>
                                                </div>

                                                <p>Capacity: {route.availableCapacity} tons</p>
                                                {route.description && <p>{route.description}</p>}
                                            </div>
                                        ))}

                </div>


    
                <div className="panel">

                    <div className="panelHeader">
                                                <p className="title">Demo Checklist</p>
                                                <p className="viewAll">Week 1-2</p>
                    </div>

                    <div className="card">

                        <div className="cardTop">
                                                        <p className="company">Transporter Demo</p>
                                                        <span className="status">ready</span>
                        </div>

                                                <p>1. Login as Transporter</p>
                                                <p>2. Create route Lahore → Islamabad</p>
                                                <p>3. Open My Routes and verify it appears</p>

                        <div className="cardBottom">
                                                        <span>Current user: {currentUser?.name}</span>
                                                        <span className="price">{currentUser?.role}</span>
                        </div>

                    </div>

    </div>

    </div>


    </div>
  )
}
