import React from "react";
import "./Body.css";
import truckImage from "./truck pic.jpg"; 


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
                    <a href="#" className="Find">Find Routes </a>
                    <a href="#" className="Create">Create Route</a>
                </div>

            </div>
            
            <div className="right">
                <img src={truckImage} alt="Truck Loading"/>
            </div>
        </section>
    
);
}


export default Body;