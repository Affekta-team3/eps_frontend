// TestResultSection.js
import React from 'react';

const TestResultSection = ({ result }) => {
    return (
        <div className="test-result-section">
            <h3>Test Result</h3>
            <p>{result}</p>
        </div>
    );
};

export default TestResultSection;
