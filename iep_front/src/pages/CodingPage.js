import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, SkeletonText } from '@chakra-ui/react';
import ProblemDetails from '../components/ProblemDetails';
import CodeEditor from '../components/CodeEditor';
import ResultSection from '../components/ResultSection';
import TestResultSection from '../components/TestResultSection';
import Confetti from '../components/Confetti';
import Chatbot from '../components/Chatbot';
import { submitSolution, evaluateSolution, fetchProblemDetails } from '../services/apiService';
import './CodingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useChatbot } from '../context/ChatbotContext'; // Import useChatbot

const CodingPage = () => {
    const { problemId } = useParams(); // Use useParams to get problemId
    const [activeTab, setActiveTab] = useState('Coding');
    const [result, setResult] = useState('');
    const [testResult, setTestResult] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [problemDetails, setProblemDetails] = useState(null); // Add problem details state
    const [loading, setLoading] = useState(true); // Add loading state
    const [isSubmitting, setIsSubmitting] = useState(false); // Add state for Submit button loading
    const [isTesting, setIsTesting] = useState(false); // Add state for Test button loading
    const navigate = useNavigate();
    const { handleSend, clearMessages, setHasNewMessage, hasNewMessage } = useChatbot(); // Use the context

    useEffect(() => {
        localStorage.clear();
        // localStorage.setItem('code', '');

        const getProblemDetails = async () => {
            try {
                const details = await fetchProblemDetails(problemId);
                setProblemDetails(details);
                handleSend(constructInitialPrompt(details), true); // Send the initial prompt and restart the conversation
            } catch (error) {
                console.error('Error fetching problem details:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        getProblemDetails();
    }, [problemId]);

    const handleBackClick = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleSubmission = async (code) => {
        localStorage.setItem('code', code);
        setIsSubmitting(true); // Set loading state to true
        try {
            const evaluation = await evaluateSolution({ code_text: code, problem_id: problemId });
            if (evaluation.includes('PASS')) {
                const [status, runtime, memory] = evaluation.split('\n').map(line => line.split(':')[1]);
                const submission = {
                    problemId: problemId,
                    code_text: code,
                    status: "0",
                    result: "Accepted",
                    runtime: runtime,
                    memory: memory
                };
                const response = await submitSolution(submission);
                setResult(`Status: PASS\nRuntime: ${runtime}\nMemory: ${memory}`);
                setActiveTab('Result');
                triggerConfetti();
            } else {
                setActiveTab('Result');
                setResult(evaluation);
                await handleSend(`Submission failed for problem ${problemId}. Details: ${evaluation}`);
            }
        } catch (error) {
            console.error('Error during submission:', error);
        } finally {
            setIsSubmitting(false); // Set loading state to false
        }
    };

    const handleTest = async (code) => {
        localStorage.setItem('code', code);
        setIsTesting(true); // Set loading state to true
        try {
            const response = await evaluateSolution({ code_text: code, problem_id: problemId });
            if (response.includes('PASS')) {
                setTestResult('Test Successful');
            } else {
                setTestResult('Test Failed');
            }
        } catch (error) {
            console.error('Error during testing:', error);
        } finally {
            setIsTesting(false); // Set loading state to false
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const triggerConfetti = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Remove confetti after 3 seconds
    };

    const constructInitialPrompt = (details) => {
        return `
        You are an assistant helping a user to learn coding. This problem is titled "${details.title}". 
        Here are the details:
        - Description: ${details.description}
        - Input Format: ${details.input_format}
        - Output Format: ${details.output_format}
        - Difficulty: ${details.difficulty}
        If the user asks for tips, you shouldn't say too much; you should give only a little tip once.
        If you receive a failed submission detail, tell the user where it is wrong. 
        Start by saying hi briefly.
        `;
    };

    const initialPrompt = problemDetails ? constructInitialPrompt(problemDetails) : '';

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
                    <div className="card">
                        {loading ? (
                            // Display skeleton text while loading
                            <Box padding="6" bg="white">
                                <SkeletonText mt="4" noOfLines={4} spacing="4" />
                            </Box>
                        ) : (
                            <ProblemDetails problemId={problemId} details={problemDetails} />
                        )}
                    </div>
                    <div className="card test-result-section">
                        <TestResultSection result={testResult} />
                    </div>
                </div>
                <div className="coding-side">
                    {activeTab === 'Coding' && (
                        <div className="card">
                            <CodeEditor onSubmit={handleSubmission} onTest={handleTest} setActiveTab={setActiveTab} triggerConfetti={triggerConfetti} isSubmitting={isSubmitting} isTesting={isTesting} />
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
            <Chatbot initialPrompt={initialPrompt} hasNewMessage={hasNewMessage} setHasNewMessage={setHasNewMessage} />
        </div>
    );
};

export default CodingPage;
