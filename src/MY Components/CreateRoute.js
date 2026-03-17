import React from 'react';
import './CreateRoute.css';
import { Link } from 'react-router-dom';
import { createRoute } from '../utils/storage';

export default function CreateRoute({ currentUser }) {
  const [form, setForm] = React.useState({
    source: '',
    destination: '',
    departureDate: '',
    expectedArrivalDate: '',
    vehicleType: '',
    availableCapacity: '',
    pricePerKg: '',
    description: '',
  });
  const [status, setStatus] = React.useState('');
  const [error, setError] = React.useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function resetForm() {
    setForm({
      source: '',
      destination: '',
      departureDate: '',
      expectedArrivalDate: '',
      vehicleType: '',
      availableCapacity: '',
      pricePerKg: '',
      description: '',
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStatus('');
    setError('');

    if (!form.source.trim() || !form.destination.trim() || !form.departureDate || !form.availableCapacity || !form.pricePerKg) {
      setError('Please fill source, destination, departure date, available capacity, and price/kg.');
      return;
    }

    if (Number(form.availableCapacity) <= 0 || Number(form.pricePerKg) <= 0) {
      setError('Capacity and price/kg must be greater than 0.');
      return;
    }

    createRoute(form, currentUser.id);
    setStatus('Route posted successfully. You can now view it in My Routes.');
    resetForm();
  }

  if (!currentUser || currentUser.role !== 'transporter') {
    return (
      <div className='CreateRoute'>
        <div className='Initial'>
          <h1>Create Route</h1>
          <p>Only transporter accounts can post routes.</p>
          <p><Link to='/login'>Log in as transporter</Link> to continue.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='CreateRoute'>
      <div className='Initial'>
        <h1>Create Route</h1>
        <p>List your available cargo space and connect with businesses that need shipping.</p>
      </div>

      <form className='Details' onSubmit={handleSubmit}>
          <h4>Route Details</h4> 
          <div className='left'>
          
            <div className="row">
              <div>
                <label htmlFor="Origin" id="label-Origin">Origin</label>
                <input type="text" id="Origin" name="source" placeholder="Enter Origin" value={form.source} onChange={updateField} />
              </div>

              <div>
                <label htmlFor="Destination" id="label-Destination">Destination</label>
                <input type="text" id="Destination" name="destination" placeholder="Enter Destination" value={form.destination} onChange={updateField} />
              </div>
            </div>

            {/* Row 2 */}
            <div className="row">
              <div>
                <label htmlFor="DepartDate" id="label-DepartDate">Departure Date</label>
                <input type="date" id="DepartDate" name="departureDate" value={form.departureDate} onChange={updateField} />
              </div>

              <div>
                <label htmlFor="ArrivalDate" id="label-ArrivalDate">Expected Arrival Date</label>
                <input type="date" id="ArrivalDate" name="expectedArrivalDate" value={form.expectedArrivalDate} onChange={updateField} />
              </div>
            </div>

            {/* Row 3 */}
            <div className="row">
              <div>
                <label htmlFor="vehicle" id="label-vehicle">Vehicle Type</label>
                <select id="vehicle" name='vehicleType' value={form.vehicleType} onChange={updateField}>
                  <option value="" disabled hidden>Select vehicle type</option>
                  <option value='Truck'>Truck</option>
                  <option value='Mazda'>Mazda</option>
                  <option value='Troller'>Troller</option>
                  <option value='Pickup'>Pickup</option>
                </select>
              </div> 

              <div>
                <label htmlFor="capacity" id="label-capacity">Available Capacity (tons)</label>
                <input type="number" id="capacity" name='availableCapacity' placeholder="e.g. 15" value={form.availableCapacity} onChange={updateField} min='1' step='0.1' />
              </div>
            </div>

            {/* Price full width */}
            <div className="full">
              <label htmlFor="price" id="label-price">Price Per Kg ($)</label>
              <input type="number" id="price" name='pricePerKg' placeholder="e.g. 2.5" value={form.pricePerKg} onChange={updateField} min='0.1' step='0.1' />
            </div>

            {/* Description */}
            <div className="full">
              <label htmlFor="desc" id="label-desc">Description</label>
              <input type="text" id="desc" name='description' placeholder="Provide additional details..." value={form.description} onChange={updateField} />
            </div>

            {error && <p className='formStatus formError'>{error}</p>}
            {status && <p className='formStatus formSuccess'>{status}</p>}

            {/* Buttons */}
            <div className="buttons">
              <button id="createRouteBtn" type='submit'>Create Route</button>
              <button id="cancelBtn" type='button' onClick={resetForm}>Clear</button>
            </div>


          
          </div>

            


      </form>
    </div>
  );
}