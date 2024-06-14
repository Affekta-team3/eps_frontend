import React, { useState } from 'react';
import './CodeEditor.css'; // Add this line to include the CSS file
import { useNavigate } from 'react-router-dom';

const CodeEditor = ({ onSubmit, onTest, setActiveTab, triggerConfetti }) => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

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
            </div>
        </div>
    );
};

export default CodeEditor;
