import React from 'react';

const ResultSection = ({ result }) => {
    const resultLines = result.split('\n');
    const resultObj = resultLines.reduce((acc, line) => {
        const [key, value] = line.split(':');
        if (key && value) {
            acc[key.trim()] = value.trim();
        }
        return acc;
    }, {});

    return (
        <div className="result-section">
            <h3>Full Result</h3>
            <p>Status: {resultObj.Status}</p>
            <p>Runtime: {resultObj.Runtime}</p>
            <p>Memory: {resultObj.Memory}</p>
            <p>{result}</p> {/* This line will display the raw response in case of failure */}
        </div>
    );
};

export default ResultSection;