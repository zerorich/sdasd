import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MessageCircle,
  Phone,
  ChevronRight
} from 'lucide-react';

const FloatingActions = ({ onBookAppointment, onSendMessage }) => {
  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <button
          onClick={onBookAppointment}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
        >
          <Calendar className="w-6 h-6" />
        </button>
        <button
          onClick={onSendMessage}
          className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
        <button className="w-14 h-14 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 animate-pulse">
          <Phone className="w-6 h-6" />
        </button>
      </div>

      {/* Back to Top Button */}
      <Link
        to="/"
        className="fixed bottom-6 left-6 w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 opacity-75 hover:opacity-100"
      >
        <ChevronRight className="w-5 h-5 transform -rotate-90" />
      </Link>
    </>
  );
};

export default FloatingActions;
