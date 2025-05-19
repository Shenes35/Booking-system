import React, { useState, useContext } from 'react';
//importing core React functionality from the React library
//{ useState, useContext } are React Hooks  -useState add state variables to your functional component, useContext consume context values in a component

import { AuthContext } from '../context/AuthContext';
//importing a named export called AuthContext from a file located at ../context/AuthContext.

import { useNavigate } from 'react-router-dom';
//hook provided by the react-router-dom library.Helps in programmatically navigate to different routes (pages) in your React app.

const LoginPage = () => {
//Declares a constant, () mean this function takes no arguments, { ... } contains the function body, arrow function is syntax

  const { login } = useContext(AuthContext);
  //reads whatever is inside the shared storage AuthContext and gives you that object. Hrre extracts just the login function.

  const [role, setRole] = useState('passenger');
  //uses the useState hook in React to create a piece of state in a functional component.
  //role → The current value of the state (initially 'passenger'). setRole → A function used to update the role state. useState('passenger') → Initializes the state with the string 'passenger'.
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
    setPassword('');
    if (role === 'admin') navigate('/admin');
    else navigate('/passenger');
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#e6f7ff', // light background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    border: '1px solid #ddd',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
    display: 'block',
    color: '#333'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '0.5rem',
    fontSize: '1rem'
  };

  const errorStyle = {
    color: 'red',
    fontSize: '0.875rem',
    marginBottom: '0.5rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#999',
    cursor: 'not-allowed'
  };

  return (
    <div style={pageStyle}>
      <main style={containerStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="role-select" style={labelStyle}>Select Role:</label>
            <select
              id="role-select"
              value={role}
              onChange={e => setRole(e.target.value)}
              style={inputStyle}
              aria-label="Select user role"
            >
              <option value="admin">Admin</option>
              <option value="passenger">Passenger</option>
            </select>
          </div>

          <div>
            <label htmlFor="username" style={labelStyle}>Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              style={inputStyle}
              aria-describedby="username-error"
            />
            {errors.username && <div id="username-error" style={errorStyle}>{errors.username}</div>}
          </div>

          <div>
            <label htmlFor="password" style={labelStyle}>Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              style={inputStyle}
              aria-describedby="password-error"
            />
            {errors.password && <div id="password-error" style={errorStyle}>{errors.password}</div>}
          </div>

          <button
            type="submit"
            disabled={!username.trim() || !password.trim()}
            style={!username.trim() || !password.trim() ? disabledButtonStyle : buttonStyle}
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
