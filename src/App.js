import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import TodoList from './components/TodoList';

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

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [])

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
