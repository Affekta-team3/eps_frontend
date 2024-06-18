// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodingPage from './pages/CodingPage';
import ProblemListPage from './pages/ProblemListPage';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme'; // Import custom theme

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/coding/:problemId" element={<CodingPage />} />
                    <Route path="/" element={<ProblemListPage />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;