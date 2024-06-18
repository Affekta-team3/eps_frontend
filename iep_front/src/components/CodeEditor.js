// src/components/CodeEditor.js

import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react'; // Import Button from Chakra UI

const CodeEditor = ({ onSubmit, onTest, setActiveTab, triggerConfetti, handleSend, isSubmitting, isTesting }) => {
    const [code, setCode] = useState(`class Solution:
    def problem(self):
        # Write your code here`);
    const [output, setOutput] = useState('');
    const editorRef = useRef(null);
    const navigate = useNavigate();

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const handleSubmit = () => {
        onSubmit(code);
    };

    const handleTest = () => {
        onTest(code);
    };

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
        window.addEventListener('resize', () => editor.layout());
    };

    return (
        <div className="code-editor">
            <div className="monaco-editor-container">
                <Editor
                    height="100%" // Ensure the editor takes up the full height of its container
                    width="100%" // Ensure the editor takes up the full width of its container
                    defaultLanguage="python"
                    defaultValue={code}
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
                <Button
                    className="btn"
                    onClick={handleTest}
                    isLoading={isTesting}
                    loadingText="Testing"
                    colorScheme="teal"
                    variant="solid"
                >
                    Test
                </Button>
                <Button
                    className="btn"
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                    colorScheme="teal"
                    variant="solid"
                >
                    Submit
                </Button>
            </div>
            <pre>{output}</pre>
        </div>
    );
};

export default CodeEditor;
