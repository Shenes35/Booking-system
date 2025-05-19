// context/AuthContext.jsx
import React, { createContext, useState, useEffect, useMemo } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage or null
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  // Update localStorage whenever user changes (except when user is null, remove item)
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Login function sets user info (e.g., role and username)
  const login = (role, username) => {
    setUser({ role, username });
  };

  // Logout clears user info
  const logout = () => {
    setUser(null);
  };

  // Derived state for convenience
  const isAuthenticated = !!user;

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({
    user,
    isAuthenticated,
    login,
    logout,
  }), [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
