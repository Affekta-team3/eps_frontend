import React from 'react';
import './UserInfo.css';

const UserInfo = ({ user }) => {
    return (
        <div className="user-info">
            <h2 className="user-name">{user.name}</h2>
            <div className="avatar-container">
                <div className="avatar">
                    <div className="avatar-front">
                        <img src="https://res.cloudinary.com/hht4avzbk/image/upload/v1701210542/vorklbgouiqa8noijh0f.png" alt="Avatar" className="avatar-image" />
                    </div>
                    <div className="avatar-back">
                        <p className="level">Level 10</p> {/* Mock level, you can use user.level */}
                    </div>
                </div>
                <div className="experience-circle">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                        <path className="circle-bg"
                              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path className="circle"
                              strokeDasharray="70, 100" // Replace 70 with user experience percentage
                              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                    </svg>
                </div>
            </div>
            <div className="experience">
                <p>Experience: {user.currentExp} / {user.expToLevelUp}</p>
            </div>
            <div className="coins">
                <img src="https://res.cloudinary.com/hht4avzbk/image/upload/v1718185704/zaxxhuyaslbdwvrlcx98.png" alt="Coin" className="coin-icon" />
                <p>{user.coins}</p>
            </div>
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
