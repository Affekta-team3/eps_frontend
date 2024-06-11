import React, { useState } from 'react';
import './CodeEditor.css';

const CodeEditor = ({ onSubmit }) => {
    const [code, setCode] = useState('');

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(code);
    };

    return (
        <div className="code-editor">
            <textarea value={code} onChange={handleChange} rows="10" cols="50" />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default CodeEditor;
