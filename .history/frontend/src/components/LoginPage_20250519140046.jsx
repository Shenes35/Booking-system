import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [role, setRole] = useState('admin');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === 'admin') navigate('/admin');
    else navigate('/passenger');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      <select onChange={e => setRole(e.target.value)} className="mb-2 p-2 w-full">
        <option value="admin">Admin</option>
        <option value="passenger">Passenger</option>
      </select>
      <input placeholder="User ID" className="p-2 mb-2 w-full border" onChange={e => setUserId(e.target.value)} />
      <input type="password" placeholder="Password" className="p-2 mb-4 w-full border" onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white p-2 w-full" onClick={handleLogin}>Login</button>
    </div>
  );
}
