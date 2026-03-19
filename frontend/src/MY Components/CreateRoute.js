import React from 'react';
import './CreateRoute.css';
import { Link } from 'react-router-dom';
import { createRoute } from '../utils/storage';

const PAKISTAN_MAJOR_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Sialkot',
  'Gujranwala',
  'Sargodha',
  'Bahawalpur',
  'Sukkur',
  'Larkana',
  'Abbottabad',
  'Mardan',
  'Mingora',
  'Dera Ghazi Khan',
  'Muzaffarabad',
  'Gwadar',
  'Kasur',
  'Rahim Yar Khan',
  'Jhelum',
  'Sheikhupura',
];

export default function CreateRoute({ currentUser }) {
  const [form, setForm] = React.useState({
    source: '',
    sourceOther: '',
    destination: '',
    destinationOther: '',
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

  function handleCitySelect(event) {
    const { name, value } = event.target;

    if (name === 'source') {
      setForm((prev) => ({
        ...prev,
        source: value,
        sourceOther: value === 'other' ? prev.sourceOther : '',
      }));
      return;
    }

    if (name === 'destination') {
      setForm((prev) => ({
        ...prev,
        destination: value,
        destinationOther: value === 'other' ? prev.destinationOther : '',
      }));
    }
  }

  function resetForm() {
    setForm({
      source: '',
      sourceOther: '',
      destination: '',
      destinationOther: '',
      departureDate: '',
      expectedArrivalDate: '',
      vehicleType: '',
      availableCapacity: '',
      pricePerKg: '',
      description: '',
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('');
    setError('');

    const finalSource = form.source === 'other' ? form.sourceOther.trim() : form.source.trim();
    const finalDestination =
      form.destination === 'other' ? form.destinationOther.trim() : form.destination.trim();

    if (!finalSource || !finalDestination || !form.departureDate || !form.availableCapacity || !form.pricePerKg) {
      setError('Please fill source, destination, departure date, available capacity, and price/kg.');
      return;
    }

    if (finalSource.toLowerCase() === finalDestination.toLowerCase()) {
      setError('Source and destination cannot be the same city.');
      return;
    }

    if (Number(form.availableCapacity) <= 0 || Number(form.pricePerKg) <= 0) {
      setError('Capacity and price/kg must be greater than 0.');
      return;
    }

    try {
      await createRoute(
        {
          ...form,
          source: finalSource,
          destination: finalDestination,
        },
        currentUser.id
      );
      setStatus('Route posted successfully. You can now view it in My Routes.');
      resetForm();
    } catch (submitError) {
      setError('Unable to create route right now. Please try again.');
    }
  }

  const effectiveRole = currentUser?.role === 'admin' ? 'admin' : (currentUser?.activeRole || currentUser?.role);

  if (!currentUser || (effectiveRole !== 'transporter' && currentUser.role !== 'admin')) {
    return (
      <div className='CreateRoute'>
        <div className='CreateRouteContainer'>
          <div className='Initial'>
            <h1>Create Route</h1>
            <p>Only transporter mode can post routes.</p>
            <p>Use the role switch in the header to change to transporter mode.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='CreateRoute'>
      <div className='CreateRouteContainer'>
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
                <select id="Origin" name="source" value={form.source} onChange={handleCitySelect}>
                  <option value="">Select origin city</option>
                  {PAKISTAN_MAJOR_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                  <option value="other">Other (type manually)</option>
                </select>
                {form.source === 'other' && (
                  <input
                    type="text"
                    name="sourceOther"
                    className="cityOtherInput"
                    placeholder="Enter other origin city"
                    value={form.sourceOther}
                    onChange={updateField}
                  />
                )}
              </div>

              <div>
                <label htmlFor="Destination" id="label-Destination">Destination</label>
                <select id="Destination" name="destination" value={form.destination} onChange={handleCitySelect}>
                  <option value="">Select destination city</option>
                  {PAKISTAN_MAJOR_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                  <option value="other">Other (type manually)</option>
                </select>
                {form.destination === 'other' && (
                  <input
                    type="text"
                    name="destinationOther"
                    className="cityOtherInput"
                    placeholder="Enter other destination city"
                    value={form.destinationOther}
                    onChange={updateField}
                  />
                )}
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
    </div>
  );
}