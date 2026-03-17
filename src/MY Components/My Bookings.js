import React from "react";
import "./My Bookings.css";
import { Button } from "bootstrap";

export default function MyBookings() {
  return (
    <div className="main">
      <div className="top">
            <h1>
            Dashboard
            </h1>

            <p>
                Welcome back! Here's your overview
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
                            2
                        </p>
                    </div>
                </div>
            </div>

             <div className="box">
                <div className="b1">
                    <p>
                        Total Bookings
                    </p>

                    <div className="vari">
                        <p>
                            2
                        </p>
                    </div>
                </div>
            </div>

             <div className="box">
                <div className="b1">
                    <p>
                        Pending
                    </p>

                    <div className="vari">
                        <p>
                            2
                        </p>
                    </div>
                </div>
            </div>


             <div className="box">
                <div className="b1">
                    <p>
                        Total Earning
                    </p>

                    <div className="vari1">
                        <p>
                            $5600
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

                    <button id="b" type="button">
                        Find Route
                    </button>

                    <button id="b" type="button">
                        New Booking
                    </button>

                    <button id="b" type="button">
                        Create Route
                    </button>

                    <button id="b" type="button">
                        MyBookings
                    </button>

                </div>
            
            </div>


            <div className="view">


                <div className="panel">

                    <div className="panelHeader">
                        <p className="title">My Routes</p>
                        <p className="viewAll">View All →</p>
                    </div>

                    <div className="card">

                        <div className="cardTop">
                            <span className="tag">18-Wheeler Truck</span>
                            <span className="status">available</span>
                        </div>

                        <p className="rating">⭐ 4.8</p>

                        <p className="route">📍 New York, NY → Los Angeles, CA</p>

                        <div className="cardBottom">
                            <span>📅 10/03/2026</span>
                            <span className="price">$450/ton</span>
                        </div>

                    </div>

                </div>


    
                <div className="panel">

                    <div className="panelHeader">
                        <p className="title">Recent Bookings</p>
                        <p className="viewAll">View All →</p>
                    </div>

                    <div className="card">

                        <div className="cardTop">
                            <p className="company">TechParts Inc.</p>
                            <span className="status">confirmed</span>
                        </div>

                        <p>5 tons</p>

                        <p className="route">📍 New York, NY → Los Angeles, CA</p>

                        <div className="cardBottom">
                            <span>05/03/2026</span>
                            <span className="price">$2250</span>
                        </div>

                    </div>

    </div>

    </div>


    </div>
  )
}
