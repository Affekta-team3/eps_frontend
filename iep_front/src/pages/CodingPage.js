import React, { useState } from 'react';
import ProblemDetails from '../components/ProblemDetails';
import CodeEditor from '../components/CodeEditor';
import ResultSection from '../components/ResultSection';
import TestResultSection from '../components/TestResultSection';
import Confetti from '../components/Confetti'; // Import the Confetti component
import Chatbot from '../components/Chatbot';
import './CodingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CodingPage = ({ match }) => {
    const [activeTab, setActiveTab] = useState('Coding');
    const [result, setResult] = useState('');
    const [testResult, setTestResult] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    const handleSubmission = (code) => {
        // Mock submission result
        const mockResult = 'Test Passed';
        setResult(mockResult);
    };

    const handleTest = (code) => {
        // Mock test result
        const mockTestResult = 'Test Successful';
        setTestResult(mockTestResult);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const triggerConfetti = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Remove confetti after 3 seconds
    };

    return (
        <div className="coding-page">
            <header className="header">
                <button className="back-button" onClick={handleBackClick}>
                    <FontAwesomeIcon icon={faArrowLeft} /> <span>Back to Problem List</span>
                </button>
                <nav className="tabs">
                    <ul>
                        <li
                            className={activeTab === 'Coding' ? 'active' : ''}
                            onClick={() => handleTabClick('Coding')}
                        >
                            Coding
                        </li>
                        <li
                            className={activeTab === 'Result' ? 'active' : ''}
                            onClick={() => handleTabClick('Result')}
                        >
                            Result
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="content">
                <div className="description-side">
                    {activeTab === 'Coding' && (
                        <>
                            <div className="card">
                                <ProblemDetails problemId={match} />
                            </div>
                            <div className="card test-result-section">
                                <TestResultSection result={testResult} />
                            </div>
                        </>
                    )}
                    {activeTab === 'Result' && (
                        <>
                            <div className="card">
                                <ProblemDetails problemId={match} />
                            </div>
                            <div className="card test-result-section">
                                <TestResultSection result={testResult} />
                            </div>
                        </>
                    )}
                </div>
                <div className="coding-side">
                    {activeTab === 'Coding' && (
                        <div className="card">
                            <CodeEditor onSubmit={handleSubmission} onTest={handleTest} setActiveTab={setActiveTab} triggerConfetti={triggerConfetti} />
                        </div>
                    )}
                    {activeTab === 'Result' && (
                        <div className="card result-section">
                            <ResultSection result={result} />
                        </div>
                    )}
                </div>
            </div>
            {showConfetti && <Confetti />}
            <Chatbot />
        </div>
    );
};

export default CodingPage;
