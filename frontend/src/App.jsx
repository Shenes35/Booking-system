// App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, AuthContext } from './context/AuthContext';
import { FlightsProvider } from './context/FlightsContext';

// Lazy load components for code splitting
const LoginPage = React.lazy(() => import('./components/LoginPage'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const PassengerWindow = React.lazy(() => import('./components/PassengerWindow'));
const ErrorBoundary = React.lazy(() => import('./components/ErrorBoundary'));

// ProtectedRoute component for route guarding
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = React.useContext(AuthContext);

  if (!user || !allowedRoles.includes(user.role)) {
    // User not logged in or unauthorized role - redirect to login
    return <Navigate to="/" replace />;
  }

  // Authorized access
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <FlightsProvider>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Routes>
                {/* Public Route */}
                <Route path="/" element={<LoginPage />} />

                {/* Protected Admin Route */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Passenger Route */}
                <Route
                  path="/passenger"
                  element={
                    <ProtectedRoute allowedRoles={['passenger']}>
                      <PassengerWindow />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </Router>
      </FlightsProvider>
    </AuthProvider>
  );
};

export default App;
