import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const flightTypes = [
  'Domestic', 'International', 'Business', 'Premium', 'Cargo'
];

export default function AdminDashboard() {
  const [flights, setFlights] = useState([]);
  const [type, setType] = useState('Domestic');
  const navigate = useNavigate();

  const handleCreate = () => {
    const newFlight = { id: flights.length + 1, type };
    setFlights([...flights, newFlight]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl">Admin Dashboard</h1>
        <button onClick={() => navigate('/')} className="bg-red-500 text-white p-2">Logout</button>
      </div>
      <select onChange={e => setType(e.target.value)} className="mb-2 p-2">
        {flightTypes.map(ft => <option key={ft}>{ft} Flight</option>)}
      </select>
      <button className="bg-green-500 text-white p-2 ml-2" onClick={handleCreate}>Create</button>
      <h2 className="mt-4 text-lg">All Flights</h2>
      <ul className="list-disc ml-4">
        {flights.map(f => <li key={f.id}>{f.type} Flight #{f.id}</li>)}
      </ul>
    </div>
  );
}
