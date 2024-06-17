// src/components/ResultSection.js

import React from 'react';

const ResultSection = ({ result }) => {
    return (
        <div className="result-section">
            <h3>Full Result</h3>
            {result ? (
                <>
                    <p>Status: {result.status}</p>
                    <p>Result: {result.result}</p>
                    <p>Runtime: {result.runtime}</p>
                    <p>Memory: {result.memory}</p>
                    <p>Leaderboard: #{result.leaderboard || 'N/A'}</p>
                </>
            ) : (
                <p>No results to display</p>
            )}
        </div>
    );
};

export default ResultSection;
