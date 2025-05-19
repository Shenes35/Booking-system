import React, { useState } from 'react';

const LoginPage = ({ setUserRole }) => {
  const [role, setRole] = useState('admin');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId || !password) {
      alert('Please enter User ID and Password');
      return;
    }
    setUserRole(role);
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '10vh' }}>
      <h2>Flight Booking Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
        <div>
          <label>
            <input type="radio" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
            Admin
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input type="radio" value="passenger" checked={role === 'passenger'} onChange={() => setRole('passenger')} />
            Passenger
          </label>
        </div>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '250px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', margin: '10px 0', padding: '8px', width: '250px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
