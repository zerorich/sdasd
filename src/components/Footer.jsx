import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Medicio</h3>
                  <p className="text-sm text-gray-400">Healthcare Excellence</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Providing exceptional healthcare services with compassion, expertise, and state-of-the-art technology for over 25 years.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <span className="text-sm">📘</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors cursor-pointer">
                  <span className="text-sm">🐦</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                  <span className="text-sm">📷</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer">
                  <span className="text-sm">💼</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link to="/doctors" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">
                    Our Doctors
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200 block">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-6">Our Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Cardiology</li>
                <li className="hover:text-white transition-colors cursor-pointer">Emergency Medicine</li>
                <li className="hover:text-white transition-colors cursor-pointer">Pediatrics</li>
                <li className="hover:text-white transition-colors cursor-pointer">Internal Medicine</li>
                <li className="hover:text-white transition-colors cursor-pointer">Surgery</li>
                <li className="hover:text-white transition-colors cursor-pointer">General Medicine</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Address</p>
                    <p className="text-gray-400">123 Medical Street, Healthcare City, HC 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Phone</p>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-purple-500 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-gray-400">info@medicio.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Emergency</p>
                    <p className="text-gray-400">24/7 Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 Medicio Healthcare. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
