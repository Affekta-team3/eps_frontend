import React from 'react';
import ProblemList from '../components/ProblemList';
import UserInfo from '../components/UserInfo';
import './ProblemListPage.css';

const ProblemListPage = () => {
    // Mock user data
    const user = {
        name: 'John Doe',
        achievements: ['Beginner', 'Intermediate'],
        points: 150,
    };

    return (
        <div className="problem-list-page">
            <header className="header">
                <h1>Problem List</h1>
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
