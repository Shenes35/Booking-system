import React, { useState } from 'react';
import LoginPage from './components/LoginPage';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  // If userRole is not set, show the login page
  if (!userRole) {
    return <LoginPage setUserRole={setUserRole} />;
  }

  // After login, show welcome message with user role
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h1>Welcome, {userRole}!</h1>
      {/* You can add more UI components or navigation here */}
    </div>
  );
};

export default App;
