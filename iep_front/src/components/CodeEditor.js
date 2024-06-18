import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ onSubmit, onTest }) => {
    const [code, setCode] = useState(`class Solution:
    def problem(self):
        # Write your code here`);
    const editorRef = useRef(null);

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
                <button className="btn" onClick={handleTest}>Test</button>
                <button className="btn" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default CodeEditor;