import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { FlightsProvider } from './context/FlightsContext';

import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import PassengerWindow from './components/PassengerWindow';
import ErrorBoundary from './components/ErrorBoundary';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = React.useContext(AuthContext);
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <FlightsProvider>
        <Router>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/passenger"
                element={
                  <ProtectedRoute allowedRoles={['passenger']}>
                    <PassengerWindow />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ErrorBoundary>
        </Router>
      </FlightsProvider>
    </AuthProvider>
  );
};

export default App;
