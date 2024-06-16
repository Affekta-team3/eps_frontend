import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProblems } from '../services/mockService';
import './ProblemList.css';

const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getProblems = async () => {
            const problems = await fetchProblems();
            setProblems(problems);
        };
        getProblems();
    }, []);

    const handleProblemClick = (problemId) => {
        navigate(`/coding/${problemId}`);
    };

    return (
        <div>
            {problems.map((problem) => (
                <div key={problem.problemId} className="problem-card" onClick={() => handleProblemClick(problem.problemId)}>
                    <h3>{problem.title}</h3>
                    <p>Difficulty: {problem.difficulty}</p>
                    <p>Acceptance Rate: {Math.floor(Math.random() * 100)}%</p>
                </div>
            ))}
        </div>
    );
};

export default ProblemList;