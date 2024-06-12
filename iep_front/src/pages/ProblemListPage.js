import React from 'react';
import ProblemList from '../components/ProblemList';
import UserInfo from '../components/UserInfo';
import './ProblemListPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';

const ProblemListPage = () => {
    // Mock user data
    const user = {
        name: 'John Doe',
        achievements: ['Beginner', 'Intermediate'],
        currentExp: 150,
        expToLevelUp: 200,
        coins: 50,
    };

    return (
        <div className="problem-list-page">
            <header className="header">
                <div className="header-left">
                    <div className="logo">EPS</div>
                    <nav className="navbar">
                        <ul className="nav-links">
                            <li className="nav-item active">Problems</li>
                            <li className="nav-item">Community</li>
                            <li className="nav-item">Competition</li>
                        </ul>
                    </nav>
                </div>
                <div className="header-right">
                    <div className="search-bar">
                        <FontAwesomeIcon icon={faSearch} />
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className="notifications">
                        <FontAwesomeIcon icon={faBell} />
                    </div>
                    <div className="config">
                        <FontAwesomeIcon icon={faCog} />
                    </div>
                </div>
            </header>
            <div className="content">
                <div className="problem-list-section">
                    <ProblemList />
                </div>
                <div className="user-info-section">
                    <UserInfo user={user} />
                </div>
            </div>
        </div>
    );
};

export default ProblemListPage;
