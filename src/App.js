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

  const handleRegister = (newUser) => {
    const updatedUsers = [...users, { id: Date.now(), username: newUser.username, password: newUser.password }];
    setUsers(updatedUsers); 
    setCurrentUser(newUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login')
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    if (users.length > 0) {
      navigate('/login')
      setCurrentUser(null)
    }
  };

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate('/login')
  //   }
  // }, [])

  return (
    <>
      {currentUser ?
        <Routes>
          <Route
            path="/profile"
            element={<Profile users={users} currentUser={currentUser} onLogout={handleLogout} onDelete={deleteUser} />}
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
