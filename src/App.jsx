import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
    <div className="min-h-screen bg-white">
        <Header onBookAppointment={() => {}} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
        <Footer />
        <FloatingActions 
          onBookAppointment={() => {}}
          onSendMessage={() => {}}
        />
      </div>
    </Router>
  );
};

export default App;