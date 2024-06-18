// src/components/CodeEditor.js

import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@chakra-ui/react';
import './CodeEditor.css';

const CodeEditor = ({ onSubmit, onTest }) => {
    const [code, setCode] = useState(`class Solution:
    def problem(self):
        # Write your code here`);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
    const [isLoadingTest, setIsLoadingTest] = useState(false);
    const editorRef = useRef(null);

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const handleSubmit = async () => {
        setIsLoadingSubmit(true);
        await onSubmit(code);
        setIsLoadingSubmit(false);
    };

    const handleTest = async () => {
        setIsLoadingTest(true);
        await onTest(code);
        setIsLoadingTest(false);
    };

    const handleEditorDidMount = (editor) => {
        editorRef.current = editor;
        window.addEventListener('resize', () => editor.layout());
    };

    useEffect(() => {
        return () => {
            if (editorRef.current) {
                window.removeEventListener('resize', () => editorRef.current.layout());
            }
        };
    }, []);

    return (
        <div className="code-editor">
            <div className="monaco-editor-container">
                <Editor
                    height="100%"
                    width="100%"
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
                    onClick={handleTest}
                    isLoading={isLoadingTest}
                    loadingText="Testing"
                    bg="black"
                    color="white"
                    _hover={{ bg: 'gray.700' }}
                    _active={{ bg: 'gray.800' }}
                >
                    Test
                </Button>
                <Button
                    onClick={handleSubmit}
                    isLoading={isLoadingSubmit}
                    loadingText="Submitting"
                    bg="black"
                    color="white"
                    _hover={{ bg: 'gray.700' }}
                    _active={{ bg: 'gray.800' }}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default CodeEditor;