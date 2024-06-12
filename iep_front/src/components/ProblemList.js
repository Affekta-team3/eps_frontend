import React from 'react';
import ProblemCard from './ProblemCard';
import './ProblemList.css';

const problems = [
    {
        id: 1,
        title: 'Height Checker',
        tags: ['Array', 'Sorting'],
        acceptanceRate: '70%',
        difficulty: 'Easy',
    },
    {
        id: 2,
        title: 'Another Problem',
        tags: ['String', 'Dynamic Programming'],
        acceptanceRate: '55%',
        difficulty: 'Medium',
    },
    // Add more problems as needed
];

const ProblemList = () => {
    return (
        <div className="problem-list">
            {problems.map(problem => (
                <ProblemCard key={problem.id} problem={problem} />
            ))}
        </div>
    );
};

export default ProblemList;
