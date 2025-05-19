import React, { useState, useContext, useCallback } from "react";
import { FlightsContext } from "../context/FlightsContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const flightTypes = [
  "Domestic",
  "International",
  "Business",
  "Premium",
  "Cargo",
];

const AdminDashboard = React.memo(() => {
  const { flights, dispatch } = useContext(FlightsContext);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [flightType, setFlightType] = useState("Domestic");
  const [flightNumber, setFlightNumber] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState("");

  const addFlight = useCallback(
    (e) => {
      e.preventDefault();
      if (!flightNumber.trim() || !destination.trim()) {
        setError("Please fill in all fields.");
        return;
      }
      setError("");
      dispatch({
        type: "ADD_FLIGHT",
        payload: {
          id: Date.now(),
          flightType,
          flightNumber: flightNumber.trim(),
          destination: destination.trim(),
        },
      });
      setFlightNumber("");
      setDestination("");
    },
    [flightType, flightNumber, destination, dispatch]
  );

  const saveToFile = () => {
    const data = JSON.stringify(flights, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flights.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main>
      <header>
        <h2>Admin Dashboard</h2>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          aria-label="Logout"
        >
          Logout
        </button>
      </header>

      <section aria-labelledby="create-flight-title">
        <h3 id="create-flight-title">Create Flight</h3>
        <form onSubmit={addFlight}>
          <label htmlFor="flightType">Flight Type:</label>
          <select
            id="flightType"
            value={flightType}
            onChange={(e) => setFlightType(e.target.value)}
          >
            {flightTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <label htmlFor="flightNumber">Flight Number:</label>
          <input
            id="flightNumber"
            type="text"
            placeholder="Flight Number"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            aria-required="true"
          />

          <label htmlFor="destination">Destination:</label>
          <input
            id="destination"
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            aria-required="true"
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit">Add Flight</button>
        </form>
      </section>

      <section aria-labelledby="all-flights-title">
        <h3 id="all-flights-title">All Flights</h3>
        {flights.length === 0 ? (
          <p>No flights available.</p>
        ) : (
          <ul>
            {flights.map((flight) => (
              <li key={flight.id}>
                [{flight.flightType}] {flight.flightNumber} - {flight.destination}
              </li>
            ))}
          </ul>
        )}
        <button onClick={saveToFile}>Save Flights to File</button>
      </section>
    </main>
  );
});

export default AdminDashboard;
