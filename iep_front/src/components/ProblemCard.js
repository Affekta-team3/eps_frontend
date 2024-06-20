// src/components/ProblemCard.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProblemCard.css';

const ProblemCard = ({ problem }) => {
    const [acceptanceRate, setAcceptanceRate] = useState(null);

    useEffect(() => {
        const fetchAcceptanceRate = async () => {
            try {
                const response = await axios.get(`https://team3-webapp-eps.azurewebsites.net/api/problems/${problem.problem_id}/acceptance`);
                setAcceptanceRate(response.data.acceptanceRate);
            } catch (error) {
                console.error('Error fetching acceptance rate:', error);
            }
        };

        fetchAcceptanceRate();
    }, [problem.id]);

    return (
        <Link to={`/coding/${problem.problem_id}`} className="problem-card-link">
            <div className="problem-card">
                <h3>{problem.title}</h3>
                <p>Difficulty: {problem.difficulty}</p>
                <p>Acceptance Rate: {acceptanceRate !== null ? `${acceptanceRate}%` : 'Loading...'}</p>
            </div>
        </Link>
    );
};

export default ProblemCard;
