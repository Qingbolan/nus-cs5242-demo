// App.js
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectHomepage from './view/homepage';
import ModelArchitecture from './view/model';
import AnalysisPipeline from './components/ImagePipeline';
import NavBar from './components/NavBar';
import DocPage from './view/Documantation';
import DemoInterface from './view/demo/chat';

const App = () => {
  return (
    <Router>
      <NavBar
      />
      <Routes>
        <Route path="/" element={<ProjectHomepage />} />
        <Route path="/docs" element={<DocPage />} />
        <Route path="/models" element={<ModelArchitecture />} />
        <Route path="/examples" element={<AnalysisPipeline />} />
        <Route path="/demo" element={<DemoInterface />} />
      </Routes>
    </Router>
  );
};

export default App;