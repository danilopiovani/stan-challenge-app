import React from 'react';
import Home from './pages/home';
import Program from './pages/program';
import { Routes, Route } from 'react-router-dom';
import { MainContextProvider } from './context/MainContext';
import './index.css';
const App: React.FC = () => {
  return (
    <MainContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home/" element={<Home />} />
        <Route path="/home/:type" element={<Home />} />
        <Route path="/program/:id" element={<Program />} />
      </Routes>
    </MainContextProvider>
  );
};

export default App;
