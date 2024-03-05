import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom';
import DemoApi from './components/DemoApi';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import TodoList from './components/TodoList';

const PrivateWrapper = ({ auth }) => {
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [currentUser, setCurrentUser] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (newUser) => {
    const updatedUsers = [...users, { id: Date.now(), username: newUser.username.trim(), password: newUser.password.trim(), isLogin: true }];
    setUsers(updatedUsers);
  };

  const handleLogin = (user) => {
    const updateUserById = users.map((item) =>
      user.id === item.id ? { ...item, isLogin: true } : item
    )

    setUsers(updateUserById);
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

    if (users.length === 1) {
      navigate('/register')
      setCurrentUser(false)
    }
  };

  const checkUserLogin = () => {
    if (users.some((user) => user.isLogin === true)) {
      setCurrentUser(true)
      navigate('/profile')
    }
    // else {
    //   navigate('/login')
    //   setCurrentUser(false)
    // }
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
    <div className='container py-5'>
      {/* {currentUser ?
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
          <Route path="/api" element={<DemoApi />} />
          <Route path="/register" element={<Register onRegister={handleRegister} users={users} />} />
        </Routes>
      } */}
      <Routes>
        <Route element={<PrivateWrapper auth={currentUser ? true : false} />}>
          <Route path="/profile" element={<Profile users={users} currentUser={currentUser} onLogout={handleLogout} onDelete={deleteUser} />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} users={users} />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/api" element={<DemoApi />} />
        <Route path="/register" element={<Register onRegister={handleRegister} users={users} />} />
      </Routes>

    </div >
  );
};

export default App;
