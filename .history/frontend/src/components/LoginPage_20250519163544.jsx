import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [role, setRole] = useState('passenger');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    login(role, username);
    setPassword(''); // clear password field for security

    if (role === 'admin') navigate('/admin');
    else navigate('/passenger');
  };

  return (
    <main style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="role-select">Select Role:</label><br />
          <select
            id="role-select"
            value={role}
            onChange={e => setRole(e.target.value)}
            aria-label="Select user role"
          >
            <option value="admin">Admin</option>
            <option value="passenger">Passenger</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username">Username:</label><br />
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            aria-describedby="username-error"
          />
          {errors.username && (
            <div id="username-error" style={{ color: 'red', fontSize: '0.875rem' }}>
              {errors.username}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label><br />
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            aria-describedby="password-error"
          />
          {errors.password && (
            <div id="password-error" style={{ color: 'red', fontSize: '0.875rem' }}>
              {errors.password}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!username.trim() || !password.trim()}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Login
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
