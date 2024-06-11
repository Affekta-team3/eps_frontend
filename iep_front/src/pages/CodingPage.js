import React, { useState } from 'react';
import ProblemDetails from '../components/ProblemDetails';
import CodeEditor from '../components/CodeEditor';
import ResultSection from '../components/ResultSection';
import Chatbot from '../components/Chatbot';
import Confetti from '../components/Confetti';
import './CodingPage.css';
import {useNavigate} from "react-router-dom";

const CodingPage = ({ match }) => {
    const [result, setResult] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate()

    const handleSubmission = (code) => {
        // Mock submission result
        const mockResult = 'Test Passed';
        setResult(mockResult);
        if (mockResult === 'Test Passed') {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 5 seconds
        }
    };

    const handleBackClick = () => {
        navigate('/');
    }

    return (
        <div className="coding-page">
            <div className="problem-details">
                <ProblemDetails problemId={match} />
            </div>
            <div className="code-editor">
                <CodeEditor onSubmit={handleSubmission} />
            </div>
            <div className="result-section">
                <ResultSection result={result} />
            </div>
            <div className="chatbot">
                <Chatbot />
            </div>
            {showConfetti && <Confetti />}
            <button className="back-button" onClick={handleBackClick}>Back to Problem List</button>
        </div>
    );
};

export default CodingPage;
