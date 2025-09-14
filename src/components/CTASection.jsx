import React from 'react';
import {
  Calendar,
  Phone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const CTASection = ({ onBookAppointment }) => {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Take Care of
              <span className="block">Your Health?</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Don't wait for tomorrow. Book your appointment today and take the first step towards a healthier, happier you with our expert medical team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={onBookAppointment}
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center"
            >
              <Calendar className="w-6 h-6 mr-3" />
              Book Appointment Now
              <ArrowRight className="w-5 h-5 ml-3" />
            </button>

            <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 font-bold flex items-center">
              <Phone className="w-5 h-5 mr-3" />
              Call: (555) 123-4567
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 pt-8">
            <div className="flex items-center gap-3 text-white/80">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>24/7 Emergency Care</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Expert Medical Team</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <span>Modern Facilities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
