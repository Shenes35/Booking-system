import React, { createContext, useReducer, useEffect } from 'react';

const initialState = JSON.parse(localStorage.getItem('flights')) || [];

function flightsReducer(state, action) {
  switch (action.type) {
    case 'ADD_FLIGHT':
      return [...state, action.payload];
    case 'CLEAR_FLIGHTS':
      return [];
    // you can add more cases for UPDATE, DELETE, etc.
    default:
      return state;
  }
}

export const FlightsContext = createContext();

export const FlightsProvider = ({ children }) => {
  const [flights, dispatch] = useReducer(flightsReducer, initialState);

  useEffect(() => {
    localStorage.setItem('flights', JSON.stringify(flights));
  }, [flights]);

  return (
    <FlightsContext.Provider value={{ flights, dispatch }}>
      {children}
    </FlightsContext.Provider>
  );
};
