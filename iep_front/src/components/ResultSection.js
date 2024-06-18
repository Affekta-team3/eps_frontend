import React from 'react';

const ResultSection = ({ result }) => {
    // Parse the result string to extract runtime and memory
    const parseResult = (result) => {
        const statusMatch = result.match(/Status:\s*(.*)/);
        const runtimeMatch = result.match(/Runtime:\s*(.*)/);
        const memoryMatch = result.match(/Memory:\s*(.*)/);

        return {
            status: statusMatch ? statusMatch[1] : '',
            runtime: runtimeMatch ? runtimeMatch[1] : '',
            memory: memoryMatch ? memoryMatch[1] : '',
        };
    };

    const parsedResult = parseResult(result);

    return (
        <div className="result-section">
            <h3>Full Result</h3>
            <p>Status: {parsedResult.status}</p>
            <p>Runtime: {parsedResult.runtime}</p>
            <p>Memory: {parsedResult.memory}</p>
        </div>
    );
};

export default ResultSection;