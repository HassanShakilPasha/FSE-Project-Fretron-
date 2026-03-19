import React from 'react';
import './FindRoute.css';


export default function FindRoute() {
  return (
        <div className='findRoutePage'>
        <div className='top'>
            <h1>
                Find Route
            </h1>

            <p>
                Search for available routes that match your shipping needs
            </p>
        </div>


        <div className='Search'>

            <h3>
                Search Filters
            </h3>

            <div className='grid'>
                <div className='Origin'>
                    <label htmlFor="origin" id="label-origin" >Origin</label>
                    <input type="text" id="origin" placeholder="Enter origin" />
                </div>

                <div className='Destination'>
                    <label htmlFor="destination" id="label-destination" >Destination</label>
                    <input type="text" id="destination" placeholder="Enter Destintion" />
                </div>

                <div className='Vehicle'>
                    <label htmlFor="vehicle" id="label-vehicle" >Select vehicle</label>
                    <select id="vehicle">
                    <option value="" disabled hidden>Select vehicle type</option>
                    <option>Truck</option>
                    <option>Mazda</option>
                    <option>Troller</option>
                    <option>Pickup</option>
                    </select>
                </div>

                <div className='Button'>
                    <button id="Search">Search</button>
                </div>
            </div>
        </div>

        <div className='Available'>
            <p>
                Showing available routes
            </p>

            <div className='grid2'>
                <div className='routeCardsRow'>
                    <div className='box'>
                        <div className="box-top">
                            <div className="company">
                                <h4>
                                    FastTrans Logistics
                                </h4>
                            </div>

                            <div className="price">
                                $450
                                <div className="perton">per ton</div>
                                <p>

                                </p>
                            </div>
                        </div>

                            <div className="vehicle1">
                                18-Wheeler Truck
                                <p>

                                </p>
                            </div>

                            <div className="route">
                                <div className='or'>.  New York, NY</div>
                                <div>to</div>
                                <div className='des'>.  Los Angeles, CA</div>

                                <p>

                                </p>
                            </div>

                            <div className="details">
                                <div>Departs: 10/03/2026</div>
                                <p>

                                </p>
                                <div>Available: 15 tons</div>
                                <p>

                                </p>
                            </div>

                            <div className="description">
                                Reliable cross-country transport with refrigeration available
                                <p>

                                </p>
                            </div>

                            <button className="book">
                                Book Space
                            </button>
                    </div>
                    <div className='box'>
                        <div className="box-top">
                            <div className="company">
                                <h4>
                                    FastTrans Logistics
                                </h4>
                            </div>

                            <div className="price">
                                $450
                                <div className="perton">per ton</div>
                                <p>

                                </p>
                            </div>
                        </div>

                            <div className="vehicle1">
                                18-Wheeler Truck
                                <p>

                                </p>
                            </div>

                            <div className="route">
                                <div className='or'>.  New York, NY</div>
                                <div>to</div>
                                <div className='des'>.  Los Angeles, CA</div>

                                <p>

                                </p>
                            </div>

                            <div className="details">
                                <div>Departs: 10/03/2026</div>
                                <p>

                                </p>
                                <div>Available: 15 tons</div>
                                <p>

                                </p>
                            </div>

                            <div className="description">
                                Reliable cross-country transport with refrigeration available
                                <p>

                                </p>
                            </div>

                            <button className="book">
                                Book Space
                            </button>
                    </div>
                    <div className='box'>
                        <div className="box-top">
                            <div className="company">
                                <h4>
                                    FastTrans Logistics
                                </h4>
                            </div>

                            <div className="price">
                                $450
                                <div className="perton">per ton</div>
                                <p>

                                </p>
                            </div>
                        </div>

                            <div className="vehicle1">
                                18-Wheeler Truck
                                <p>

                                </p>
                            </div>

                            <div className="route">
                                <div className='or'>.  New York, NY</div>
                                <div>to</div>
                                <div className='des'>.  Los Angeles, CA</div>

                                <p>

                                </p>
                            </div>

                            <div className="details">
                                <div>Departs: 10/03/2026</div>
                                <p>

                                </p>
                                <div>Available: 15 tons</div>
                                <p>

                                </p>
                            </div>

                            <div className="description">
                                Reliable cross-country transport with refrigeration available
                                <p>

                                </p>
                            </div>

                            <button className="book">
                                Book Space
                            </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

