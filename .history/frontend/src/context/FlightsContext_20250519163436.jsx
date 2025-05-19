import React, { createContext, useReducer, useEffect } from "react";

// Initial state loaded from localStorage or empty array if none
const initialState = JSON.parse(localStorage.getItem("flights")) || [];

// Reducer to manage flights state: add, clear, update, delete (example cases)
function flightsReducer(state, action) {
  switch (action.type) {
    case "ADD_FLIGHT":
      return [...state, action.payload];
      
    case "UPDATE_FLIGHT":
      return state.map(flight =>
        flight.id === action.payload.id ? action.payload : flight
      );
      
    case "DELETE_FLIGHT":
      return state.filter(flight => flight.id !== action.payload.id);
      
    case "CLEAR_FLIGHTS":
      return [];
      
    default:
      return state;
  }
}

// Create FlightsContext
export const FlightsContext = createContext();

// FlightsProvider component to wrap app parts needing flights state
export const FlightsProvider = ({ children }) => {
  const [flights, dispatch] = useReducer(flightsReducer, initialState);

  // Sync flights state to localStorage on every change
  useEffect(() => {
    localStorage.setItem("flights", JSON.stringify(flights));
  }, [flights]);

  return (
    <FlightsContext.Provider value={{ flights, dispatch }}>
      {children}
    </FlightsContext.Provider>
  );
};
