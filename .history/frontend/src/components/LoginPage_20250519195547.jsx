import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userType === 'admin') {
      // Optional: Add credential check for admin
      if (username === 'admin' && password === 'admin123') {
        navigate('/admin-dashboard');
      } else {
        alert('Invalid admin credentials');
      }
    } else if (userType === 'passenger') {
      navigate('/passenger');
    } else {
      alert('Please select a user type');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Flight Booking Login</h2>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Select Role:</label>
          <div className="flex gap-4">
            <button
              onClick={() => setUserType('admin')}
              className={`px-4 py-2 rounded-xl w-full ${userType === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Administrator
            </button>
            <button
              onClick={() => setUserType('passenger')}
              className={`px-4 py-2 rounded-xl w-full ${userType === 'passenger' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            >
              Passenger
            </button>
          </div>
        </div>

        {userType === 'admin' && (
          <>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Admin Username:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-xl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Password:</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        )}

        <button
          onClick={handleLogin}
          className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 rounded-xl hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
