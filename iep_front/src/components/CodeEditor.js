import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button, Spinner } from '@chakra-ui/react';
import './CodeEditor.css';
import { useNavigate } from 'react-router-dom';

const CodeEditor = ({ onSubmit, onTest, setActiveTab, triggerConfetti, isSubmitting, isTesting }) => {
    const defaultCode = `class Solution:\n    def problem(self, arr):\n        # Write your code here`;
    const savedCode = localStorage.getItem('code') || defaultCode;
    const [code, setCode] = useState(savedCode);
    const editorRef = useRef(null);

    const handleEditorChange = (value) => {
        setCode(value);
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
                <Button onClick={() => onTest(code)} isLoading={isTesting} loadingText="Testing" variant="solid" colorScheme="blue">
                    {isTesting ? <Spinner size="sm" /> : "Test"}
                </Button>
                <Button onClick={() => onSubmit(code)} isLoading={isSubmitting} loadingText="Submitting" variant="solid" colorScheme="green">
                    {isSubmitting ? <Spinner size="sm" /> : "Submit"}
                </Button>
            </div>
        </div>
    );
};

export default CodeEditor;
