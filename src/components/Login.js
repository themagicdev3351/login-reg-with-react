// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin, users }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      onLogin(user);
      navigate('/profile');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1">Username</label>
          <input
            type="text"
            placeholder="Username"
            class="form-control"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            class="form-control"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" class="btn btn-primary" onClick={handleLogin}>Login</button>
      </form>
      <Link to="/register" >register</Link>
    </div>
  );
};

export default Login;
