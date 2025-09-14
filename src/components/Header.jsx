import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  Mail,
  Heart,
  Calendar,
  ChevronRight
} from 'lucide-react';

const Header = ({ onBookAppointment }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@medicio.com</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span>Follow us:</span>
              <div className="flex gap-2">
                <a href="#" className="hover:text-blue-200 transition-colors">📘</a>
                <a href="#" className="hover:text-blue-200 transition-colors">🐦</a>
                <a href="#" className="hover:text-blue-200 transition-colors">📷</a>
                <a href="#" className="hover:text-blue-200 transition-colors">💼</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/95 backdrop-blur-sm py-4'
      }`} style={{ top: isScrolled ? 0 : '40px' }}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Medicio</h1>
                <p className="text-xs text-gray-500">Healthcare Excellence</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className={`font-semibold transition-all duration-300 ${
                  isActive('/') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`font-semibold transition-all duration-300 ${
                  isActive('/about') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                About
              </Link>
              <Link
                to="/services"
                className={`font-semibold transition-all duration-300 ${
                  isActive('/services') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Services
              </Link>
              <Link
                to="/doctors"
                className={`font-semibold transition-all duration-300 ${
                  isActive('/doctors') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Doctors
              </Link>
              <Link
                to="/contact"
                className={`font-semibold transition-all duration-300 ${
                  isActive('/contact') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={onBookAppointment}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Book Appointment
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t">
              <nav className="p-4">
                <div className="flex flex-col space-y-4">
                  <Link
                    to="/"
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-left py-2 px-4 rounded-lg transition ${
                      isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-left py-2 px-4 rounded-lg transition ${
                      isActive('/about') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    About
                  </Link>
                  <Link
                    to="/services"
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-left py-2 px-4 rounded-lg transition ${
                      isActive('/services') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Services
                  </Link>
                  <Link
                    to="/doctors"
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-left py-2 px-4 rounded-lg transition ${
                      isActive('/doctors') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Doctors
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-left py-2 px-4 rounded-lg transition ${
                      isActive('/contact') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Contact
                  </Link>
                  <button
                    onClick={() => {
                      onBookAppointment();
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition font-semibold"
                  >
                    Book Appointment
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
