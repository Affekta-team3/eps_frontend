// src/components/CodeEditor.js

import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';
import { useNavigate } from 'react-router-dom';

const CodeEditor = ({ onSubmit, onTest, setActiveTab, triggerConfetti }) => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const handleEditorChange = (value) => {
        setCode(value);
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

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
        window.addEventListener('resize', () => editor.layout());
    };

    // useEffect(() => {
    //     return () => {
    //         if (editorRef.current) {
    //             window.removeEventListener('resize', () => editorRef.current.layout());
    //         }
    //     };
    // }, []);

    return (
        <div className="code-editor">
            <div className="monaco-editor-container">
                <Editor
                    height="100%" // Ensure the editor takes up the full height of its container
                    width="100%" // Ensure the editor takes up the full width of its container
                    defaultLanguage="python"
                    defaultValue="// Write your code here"
                    value={code}
                    onChange={handleEditorChange}
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                    options={{
                        wordWrap: 'on',
                        minimap: { enabled: false }
                    }}
                />
            </div>
            <div className="button-group">
                <button className="btn" onClick={handleTest}>Test</button>
                <button className="btn" onClick={handleSubmit}>Submit</button>
                <button className="btn" onClick={executeCode}>Execute</button>
            </div>
            <pre>{output}</pre>
        </div>
    );
};

export default CodeEditor;