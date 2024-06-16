import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodingPage from './pages/CodingPage';
import ProblemListPage from './pages/ProblemListPage';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/coding/:problemId" element={<CodingPage />} />
              <Route path="/" element={<ProblemListPage />} />
          </Routes>
      </Router>
  );
}

export default App;
