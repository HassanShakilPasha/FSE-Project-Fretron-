import React from "react";
import "./Body.css";
import truckImage from "./truck pic.jpg"; 
import { Link } from "react-router-dom";


function Body()
{
    return(
        <section className="Body">
            <div className="left">
                <h1>Optimize Your <br/>Logistics with <br/>Unused Cargo <br/>Space</h1>

                <p>Connect transport providers with businesses to maximize cargo <br/>capacity, 
                    reduce costs, and improve efficiency.
                </p>
                <div className="buttons">
                    <Link to="/find-route" className="Find">Find Routes </Link>
                    <Link to="/create-route" className="Create">Create Route</Link>
                </div>

            </div>
            
            <div className="right">
                <img src={truckImage} alt="Truck Loading"/>
            </div>
        </section>
    
);
}


export default Body;