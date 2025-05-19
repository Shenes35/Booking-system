// src/hooks/useFlights.js
import { useContext, useEffect } from 'react';
import { FlightsContext } from '../context/FlightsContext';

export function useFlights() {
  const { flights, fetchFlights } = useContext(FlightsContext);

  useEffect(() => {
    fetchFlights();
  }, []);

  return flights;
}
