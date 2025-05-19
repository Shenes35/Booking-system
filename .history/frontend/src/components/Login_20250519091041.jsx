import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('admin'); // Default to admin
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login logic – you can replace with actual validation later
    if (!userId || !password) {
      alert('Please enter User ID and Password');
      return;
    }

    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/passenger');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Flight Booking Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.radioGroup}>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={() => setRole('admin')}
            />
            Admin
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              value="passenger"
              checked={role === 'passenger'}
              onChange={() => setRole('passenger')}
            />
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

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '10vh',
  },
  form: {
    display: 'inline-block',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
  },
  radioGroup: {
    marginBottom: '1rem',
  },
  input: {
    display: 'block',
    width: '100%',
    margin: '1rem 0',
    padding: '0.5rem',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '0.7rem',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default Login;
