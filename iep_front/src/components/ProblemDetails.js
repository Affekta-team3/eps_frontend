import React, { useEffect, useState } from 'react';
import { fetchProblemDetails } from '../services/apiService';

const ProblemDetails = ({ problemId }) => {
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const getProblemDetails = async () => {
            const details = await fetchProblemDetails(problemId);
            setProblem(details);
        };
        getProblemDetails();
    }, [problemId]);

    if (!problem) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>
            <h3>Input Format:</h3>
            <p>{problem.input_format}</p>
            <h3>Output Format:</h3>
            <p>{problem.output_format}</p>
            {/*<h3>Samples:</h3>*/}
            {/*<ul>*/}
            {/*    {problem.samples.map((sample, index) => (*/}
            {/*        <li key={index}>{sample}</li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
            <h3>Difficulty:</h3>
            <p>{problem.difficulty}</p>
        </div>
    );
};

export default ProblemDetails;