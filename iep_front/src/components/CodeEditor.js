import React, { useState } from 'react';
import './CodeEditor.css'; // Add this line to include the CSS file

const CodeEditor = ({ onSubmit, onTest }) => {
    const [code, setCode] = useState('');

    const handleSubmit = () => {
        onSubmit(code);
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
