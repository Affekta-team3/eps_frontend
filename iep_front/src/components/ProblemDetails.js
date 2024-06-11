import React from 'react';

const ProblemDetails = ({ problemId }) => {
    // Mock problem details
    const problem = {
        title: 'Height Checker',
        description: `A school is trying to take an annual photo of all the students...`
    };

    return (
        <div>
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>
        </div>
    );
};

export default ProblemDetails;
