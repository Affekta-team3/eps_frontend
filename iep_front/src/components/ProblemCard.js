// ProblemCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './ProblemCard.css';

const ProblemCard = ({ problem }) => {
    return (
        <Link to={`/coding/${problem.id}`} className="problem-card-link">
            <div className="problem-card">
                <h3>{problem.title}</h3>
                <p>Difficulty: {problem.difficulty}</p>
                <p>Acceptance Rate: {problem.acceptanceRate}</p>
                <div className="tags">
                    {problem.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default ProblemCard;
