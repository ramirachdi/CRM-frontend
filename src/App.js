import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home'; 
import Agents from './pages/Agents';
import Compagnes from './pages/Compagnes';
import Statistics from './pages/Statistics';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="appContainer">
        <Header />
        <div className="appBody">
          <Sidebar />
          <main className="mainContent">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/compagnes" element={<Compagnes />} />
              <Route path="/statistics" element={<Statistics />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;