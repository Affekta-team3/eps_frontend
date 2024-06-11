// ProblemList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProblemList.css';

const problems = [
    { id: 1, title: 'Height Checker' },
    { id: 2, title: 'Another Problem' },
    // Add more problems as needed
];

const ProblemList = () => {
    return (
        <ul className="problem-list">
            {problems.map(problem => (
                <li key={problem.id}>
                    <Link to={`/coding/${problem.id}`}>{problem.title}</Link>
                </li>
            ))}
        </ul>
    );
};

export default ProblemList;
