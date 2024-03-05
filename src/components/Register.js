// Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = ({ onRegister, users }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Perform validation if needed
        const newUser = { username, password };

        // Check if the username is already taken
        if (users.some((user) => user.username === newUser.username.trim())) {
            alert('Username is already taken');
            return;
        }

        // Trigger the onRegister callback
        onRegister(newUser);
        navigate('/profile');
    };

    return (
        <div>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                autoFocus
                class="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                class="form-control"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button class="btn btn-primary" onClick={handleRegister}>Register</button>
            <Link to="/login" >login</Link>
        </div>
    );
};

export default Register;
