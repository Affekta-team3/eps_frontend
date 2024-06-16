import React, { useState } from 'react';
import './CodeEditor.css'; // Add this line to include the CSS file
import { useNavigate } from 'react-router-dom';

const CodeEditor = ({ onSubmit, onTest, setActiveTab, triggerConfetti }) => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const navigate = useNavigate();

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };
    const executeCode = async () => {
        const response = await fetch('http://localhost:5000/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });

        const result = await response.json();
        setOutput(JSON.stringify(result, null, 2));
    };
    const handleSubmit = () => {
        onSubmit(code);
        setActiveTab('Result');
        triggerConfetti();
    };

    const handleTest = () => {
        onTest(code);
    };

    return (
        <div className="code-editor">
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Write your code here..."
                rows="10"
                style={{ width: '100%' }}
            />
            <div className="button-group">
                <button className="btn" onClick={handleTest}>Test</button>
                <button className="btn" onClick={handleSubmit}>Submit</button>
                <button onClick={executeCode}>Execute</button>
                <pre>{output}</pre>
            </div>
        </div>
    );
};

export default CodeEditor;
