import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import TodoList from './components/TodoList';

const App = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [currentUser, setCurrentUser] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (user) => {
    const updateUserById = users.map((item) =>
      user.id === item.id ? { ...item, isLogin: true } : item
    )

    setUsers(updateUserById);
  };

  const handleRegister = (newUser) => {
    const updatedUsers = [...users, { id: Date.now(), username: newUser.username, password: newUser.password, isLogin: true }];
    setUsers(updatedUsers);
  };

  const handleLogout = () => {
    setCurrentUser(false)
    const updateUserById = users.map((user) =>
      user.isLogin ? { ...user, isLogin: false } : user
    )

    setUsers(updateUserById);
    navigate('/login')
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    if (users.length === 0) {
      navigate('/login')
      setCurrentUser(null)
    }
  };

  const checkUserLogin = () => {
    if (users.some((user) => user.isLogin === true)) {
      setCurrentUser(true)
      navigate('/profile')
    } else {
      navigate('/login')
      setCurrentUser(false)
    }
  }

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
    checkUserLogin()
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
