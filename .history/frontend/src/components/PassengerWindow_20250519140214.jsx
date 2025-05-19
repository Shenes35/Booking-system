import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PassengerWindow() {
  const [flights] = useState([
    { id: 1, type: 'Domestic', seats: 50 },
    { id: 2, type: 'International', seats: 100 }
  ]);
  const [booked, setBooked] = useState([]);
  const navigate = useNavigate();

  const handleBook = (id) => {
    if (!booked.includes(id)) setBooked([...booked, id]);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl">Passenger Window</h1>
        <button onClick={() => navigate('/')} className="bg-red-500 text-white p-2">Logout</button>
      </div>
      <h2 className="text-lg mb-2">Available Flights</h2>
      <ul className="list-disc ml-4">
        {flights.map(f => (
          <li key={f.id} className="mb-2">
            {f.type} Flight #{f.id} - Seats: {f.seats}
            <button className="ml-2 bg-blue-500 text-white p-1" onClick={() => handleBook(f.id)}>
              {booked.includes(f.id) ? 'Booked' : 'Book Seat'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
