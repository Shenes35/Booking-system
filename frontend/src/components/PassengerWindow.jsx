import React, { useContext, useState } from 'react';
import { FlightsContext } from '../context/FlightsContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PassengerWindow = () => {
  const { flights } = useContext(FlightsContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const bookSeat = () => {
    if (!selectedFlightId) {
      alert('Please select a flight');
      return;
    }
    alert(`Seat booked on flight ${selectedFlightId}`);
    setSelectedFlightId(null);
  };

  return (
    <div>
      <header>
        <h2>Passenger Window</h2>
        <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
      </header>
      <section>
        <h3>Available Flights</h3>
        <ul>
          {flights.map(flight => (
            <li key={flight.id}>
              <label>
                <input
                  type="radio"
                  name="flight"
                  value={flight.id}
                  checked={selectedFlightId === flight.id}
                  onChange={() => setSelectedFlightId(flight.id)}
                />
                [{flight.flightType}] {flight.flightNumber} - {flight.destination}
              </label>
            </li>
          ))}
        </ul>
        <button onClick={bookSeat}>Book Seat</button>
      </section>
    </div>
  );
};

export default PassengerWindow;
