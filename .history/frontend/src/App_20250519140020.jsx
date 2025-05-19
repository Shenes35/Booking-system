import React, { useState } from 'react';
import LoginPage from './components/LoginPage';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  if (!userRole) {
    return <LoginPage setUserRole={setUserRole} />;
  }

  return (import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import PassengerWindow from './components/PassengerWindow';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/passenger" element={<PassengerWindow />} />
      </Routes>
    </Router>
  );
}
    <div>
      <h1>Welcome, {userRole}!</h1>
      {/* Add more UI or navigation here */}
    </div>
  );
};

export default App;
