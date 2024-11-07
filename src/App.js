import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './styles/App.css';

function App() {
  return (
    <div className="appContainer">
      <Header />
      <div className="appBody">
        <Sidebar />
        <main className="mainContent">
          {/* Main content goes here */}
          Welcome to the CRM Dashboard!
        </main>
      </div>
    </div>
  );
}

export default App;
