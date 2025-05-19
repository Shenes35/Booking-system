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
    <div style={styles.container}>
      <div style={styles.card}>
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
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
      </form>
    </div>
  );
};
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #74ebd5, #ACB6E5)',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    padding: '30px',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    minWidth: '320px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  roleSelection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  radioLabel: {
    fontSize: '16px',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
};

export default LoginPage;