// Profile.js
import React, { useEffect, useState } from 'react';

const Profile = ({ users, currentUser, onLogout, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const results = users?.filter(item =>
            item.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (searchTerm) {
            setSearchResults(results);
        } else {
            setSearchResults(users);
        }
    }, [users, searchTerm]);

    return (
        <div>
            <h2>Profile</h2>
            <p>Welcome, {currentUser?.username}!</p>
            <p>Total users : {users.length}</p>
            searching {' '}
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <h4>Other Users:</h4>
            <ul>
                {searchResults?.map((user) => (
                    <>
                        <li key={user?.username} style={{ background: user.isLogin === true ? 'red' : 'blue' }}>
                            <p>username: {user?.username}</p>
                            <p>login: {user.isLogin === true ? "true" : 'false'}</p>
                            <button onClick={() => onDelete(user.id)}>Del</button>
                        </li>
                    </>
                ))}
            </ul>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Profile;
