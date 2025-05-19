// src/hooks/useFlights.js
import { useContext, useEffect } from "react";
import { FlightsContext } from "../context/FlightsContext";

export function useFlights() {
  const { flights, fetchFlights, loading, error } = useContext(FlightsContext);

  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]); // Add fetchFlights to dependency array to avoid warnings

  return { flights, loading, error };
}
