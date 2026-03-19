import React from "react";
import "./Body.css";
import { Link } from "react-router-dom";
import ScrollStack, { ScrollStackItem } from './ScrollStack';

function Body()
{
    return(
        <section className="homeStackShell">
            <ScrollStack>
                <ScrollStackItem>
                    <article className="homeCard">
                        <div className="homeCardPanel">
                            <h2>Plan</h2>
                            <p>Search live freight routes, compare capacity, and match the right shipment without wasting time on dead leads.</p>
                            <ul className="homeCardList">
                                <li>Live route discovery</li>
                                <li>Vehicle and capacity matching</li>
                                <li>Fast booking decisions</li>
                            </ul>
                            <div className="homeCardActions">
                                <Link to="/find-route" className="homeCardPrimary">Find Routes</Link>
                            </div>
                        </div>
                    </article>

                    <article className="homeCard homeCardImageCard">
                        <div className="homeCardPanel homeCardImagePanel">
                            <img
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
                                alt="Team planning logistics workflow at a desk"
                            />
                        </div>
                    </article>
                </ScrollStackItem>

                <ScrollStackItem>
                    <article className="homeCard">
                        <div className="homeCardPanel">
                            <h2>Load</h2>
                            <p>Transporters can post spare space quickly, and businesses can see exactly what is open right now.</p>
                            <ul className="homeCardList">
                                <li>Quick route posting</li>
                                <li>Capacity and pricing control</li>
                                <li>Mode switching for business or transporter</li>
                            </ul>
                            <div className="homeCardActions">
                                <Link to="/create-route" className="homeCardPrimary">Create Route</Link>
                            </div>
                        </div>
                    </article>

                    <article className="homeCard homeCardImageCard">
                        <div className="homeCardPanel homeCardImagePanel">
                            <img
                                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
                                alt="Freight trucks parked at a logistics yard"
                            />
                        </div>
                    </article>
                </ScrollStackItem>

                <ScrollStackItem>
                    <article className="homeCard">
                        <div className="homeCardPanel">
                            <h2>Deliver</h2>
                            <p>Keep routes, bookings, and account mode in one place so the full logistics flow stays easy to review.</p>
                            <ul className="homeCardList">
                                <li>Booking overview</li>
                                <li>Transporter and business tools</li>
                                <li>Simple dashboard management</li>
                            </ul>
                            <div className="homeCardActions">
                                <Link to="/dashboard" className="homeCardPrimary">Open Dashboard</Link>
                            </div>
                        </div>
                    </article>

                    <article className="homeCard homeCardImageCard">
                        <div className="homeCardPanel homeCardImagePanel">
                            <img
                                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80"
                                alt="Delivery van moving through a city route"
                            />
                        </div>
                    </article>
                </ScrollStackItem>
            </ScrollStack>
        </section>
    
);
}


export default Body;