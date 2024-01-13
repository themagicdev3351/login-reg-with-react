// Profile.js
import React from 'react';

const Profile = ({ users, currentUser, onLogout }) => {
    return (
        <div>
            <h2>Profile</h2>
            <p>Welcome, {currentUser?.username}!</p>
            <h3>Other Users:</h3>
            <ul>
                {users?.map((user) => (
                    <li key={user?.username}>{user?.username}</li>
                ))}
            </ul>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Profile;
