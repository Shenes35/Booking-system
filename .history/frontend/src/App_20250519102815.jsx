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

export default App;
