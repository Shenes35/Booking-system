import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

const AdminDashboard = () => <h2>Admin Dashboard</h2>;
const PassengerPage = () => <h2>Passenger Page</h2>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/passenger" element={<PassengerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
