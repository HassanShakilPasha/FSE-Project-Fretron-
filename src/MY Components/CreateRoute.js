import React from 'react';
import './CreateRoute.css';

export default function CreateRoute() {
  return (
    <div className='CreateRoute'>
      <div className='Initial'>
        <h1>Create Route</h1>
        <p>List your available cargo space and connect with businesses that need shipping.</p>
      </div>

      <div className='Details'>
          <h4>Route Details</h4> 
          <div className='left'>
          
            <div className="row">
              <div>
                <label htmlFor="Origin" id="label-Origin">Origin</label>
                <input type="text" id="Origin" name="Origin" placeholder="Enter Origin" />
              </div>

              <div>
                <label htmlFor="Destination" id="label-Destination">Destination</label>
                <input type="text" id="Destination" name="Destination" placeholder="Enter Destination" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="row">
              <div>
                <label htmlFor="DepartDate" id="label-DepartDate">Departure Date</label>
                <input type="date" id="DepartDate" name="DepartDate" />
              </div>

              <div>
                <label htmlFor="ArrivalDate" id="label-ArrivalDate">Expected Arrival Date</label>
                <input type="date" id="ArrivalDate" name="ArrivalDate" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="row">
              <div>
                <label htmlFor="vehicle" id="label-vehicle">Vehicle Type</label>
                <select id="vehicle">
                  <option value="" disabled hidden>Select vehicle type</option>
                  <option>Truck</option>
                  <option>Mazda</option>
                  <option>Troller</option>
                  <option>Pickup</option>
                </select>
              </div> 

              <div>
                <label htmlFor="capacity" id="label-capacity">Available Capacity (tons)</label>
                <input type="text" id="capacity" placeholder="e.g. 15"/>
              </div>
            </div>

            {/* Price full width */}
            <div className="full">
              <label htmlFor="price" id="label-price">Price Per Ton ($)</label>
              <input type="text" id="price" placeholder="e.g. 450"/>
            </div>

            {/* Description */}
            <div className="full">
              <label htmlFor="desc" id="label-desc">Description</label>
              <input type="text" id="desc" placeholder="Provide additional details..."/>
            </div>

            {/* Buttons */}
            <div className="buttons">
              <button id="createRouteBtn">Create Route</button>
              <button id="cancelBtn">Cancel</button>
            </div>


          
          </div>

            


      </div>
    </div>
  );
}