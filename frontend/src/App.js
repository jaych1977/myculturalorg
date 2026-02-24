import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventCalendarPage from './pages/EventCalendarPage';
import PaymentPage from './pages/PaymentPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventCalendarPage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
        <footer className="app-footer">
          <p>&copy; 2026 My Cultural Organisation. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
