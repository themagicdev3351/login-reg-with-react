// App.js
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import TodoList from './TodoList';

const App = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleRegister = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login')
  };

  return (
    <>
      {currentUser ?
        <Routes>
          <Route
            path="/profile"
            element={<Profile users={users} currentUser={currentUser} onLogout={handleLogout} />}
          />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} users={users} />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/register" element={<Register onRegister={handleRegister} users={users} />} />
        </Routes>
      }
    </>
  );
};

export default App;
