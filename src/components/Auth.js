import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { login, logout } from '../redux/authSlice';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogin = async () => {
    try {
      // Simulated API request for login
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        email,
        password,
      });
      const token = 'fake-jwt-token'; // Replace with actual token from API response
      const decodedUser = jwtDecode(token);

      // Dispatch login action
      dispatch(login({ user: decodedUser, token }));
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Authentication</h2>
      {auth.token ? (
        <div>
          <h3>Welcome, {auth.user?.name || 'User'}!</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
