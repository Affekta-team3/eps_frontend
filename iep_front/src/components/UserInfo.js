// UserInfo.js
import React from 'react';
import './UserInfo.css';

const UserInfo = ({ user }) => {
    return (
        <div className="user-info">
            <h2>{user.name}</h2>
            <p>Points: {user.points}</p>
            <h3>Achievements:</h3>
            <ul>
                {user.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserInfo;
