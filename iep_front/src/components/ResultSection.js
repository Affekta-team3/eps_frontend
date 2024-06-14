// ResultSection.js
import React from 'react';

const ResultSection = ({ result }) => {
    return (
        <div className="result-section">
            <h3>Full Result</h3>
            <p>{result}</p>
            <p>Runtime: 1.23s</p>
            <p>Leaderboard: #15</p>
        </div>
    );
};

export default ResultSection;
