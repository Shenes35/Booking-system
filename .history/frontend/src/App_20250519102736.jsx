import React, { useState } from 'react';
import LoginPage from './components/LoginPage';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  if (!userRole) {
    return <LoginPage setUserRole={setUserRole} />;
  }

  return (
    <div>
      <h1>Welcome, {userRole}!</h1>
      {/* Add more UI or navigation here */}
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
