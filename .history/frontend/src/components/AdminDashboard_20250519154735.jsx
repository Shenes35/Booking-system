import React, { useState, useContext, useCallback } from 'react';
import { FlightsContext } from '../context/FlightsContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const flightTypes = [
  'Domestic',
  'International',
  'Business',
  'Premium',
  'Cargo',
];

const AdminDashboard = React.memo(() => {
  const { flights, dispatch } = useContext(FlightsContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [flightType, setFlightType] = useState('Domestic');
  const [flightNumber, setFlightNumber] = useState('');
  const [destination, setDestination] = useState('');

  const addFlight = useCallback(() => {
    if (!flightNumber || !destination) {
      alert('Fill all fields');
      return;
    }
    dispatch({
      type: 'ADD_FLIGHT',
      payload: { id: Date.now(), flightType, flightNumber, destination },
    });
    setFlightNumber('');
    setDestination('');
  }, [flightType, flightNumber, destination, dispatch]);

  const saveToFile = () => {
    const data = JSON.stringify(flights, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flights.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <header>
        <h2>Admin Dashboard</h2>
        <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
      </header>
      <section>
        <h3>Create Flight</h3>
        <select value={flightType} onChange={e => setFlightType(e.target.value)}>
          {flightTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input
          placeholder="Flight Number"
          value={flightNumber}
          onChange={e => setFlightNumber(e.target.value)}
        />
        <input
          placeholder="Destination"
          value={destination}
          onChange={e => setDestination(e.target.value)}
        />
        <button onClick={addFlight}>Add Flight</button>
      </section>
      <section>
        <h3>All Flights</h3>
        <ul>
          {flights.map(flight => (
            <li key={flight.id}>
              [{flight.flightType}] {flight.flightNumber} - {flight.destination}
            </li>
          ))}
        </ul>
        <button onClick={saveToFile}>Save Flights to File</button>
      </section>
    </div>
  );
});

export default AdminDashboard;
