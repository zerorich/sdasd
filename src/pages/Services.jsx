import React, { useState, useEffect } from 'react';
import {
  Heart,
  Activity,
  UserCheck,
  Users,
  Stethoscope,
  Ambulance,
  ArrowRight,
  Calendar,
  CheckCircle
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Modal from '../components/Modal';
import CTASection from '../components/CTASection';
import api from '../utils/api';

const Services = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  // Load services on component mount
  useEffect(() => {
    const loadServices = async () => {
      try {
        setLoading(true);
        const response = await api.getServices({ limit: 20 });
        setServices(response.services || []);
      } catch (error) {
        console.error('Failed to load services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked successfully!\n\nDate: ${formData.date}\nTime: ${formData.time}\nService: ${formData.service}`);
    setShowAppointmentModal(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: '',
      message: ''
    });
  };


  return (
    <>
      <SEOHead 
        title="Medical Services - Comprehensive Healthcare Solutions | Medicio"
        description="Explore our comprehensive medical services including cardiology, emergency medicine, pediatrics, surgery, and more. Expert care with modern facilities and experienced doctors."
        keywords="medical services, cardiology, emergency medicine, pediatrics, surgery, internal medicine, healthcare services, medical treatments"
        canonicalUrl={`${window.location.origin}/services`}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Services
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              Comprehensive Healthcare
              <span className="text-blue-600 block">Solutions</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              From preventive care to specialized treatments, we offer a full range of medical services designed to meet all your healthcare needs under one roof.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setShowAppointmentModal(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Service
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 font-semibold">
                Emergency: Call (555) 123-4567
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service._id} className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Heart className="w-8 h-8 text-white" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <div className="text-blue-600 font-bold text-lg mb-4">
                        ${service.priceRange?.min} - ${service.priceRange?.max}
                      </div>
                    </div>

                    <div className="space-y-3">
                      {service.features?.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="text-gray-700 font-semibold">{service.duration} min</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Category</p>
                        <p className="text-gray-700 font-semibold">{service.category}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowAppointmentModal(true)}
                      className="group/btn w-full bg-blue-50 text-blue-600 py-3 px-6 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold flex items-center justify-center"
                    >
                      Book Service
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Specialized Care Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Specialized Care
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Advanced Medical
              <span className="text-blue-600 block">Specializations</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our specialized departments provide expert care for complex medical conditions with the latest technology and treatment methods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                "Advanced diagnostic imaging and laboratory services",
                "Minimally invasive surgical procedures",
                "Comprehensive cancer care and treatment",
                "Specialized pediatric and geriatric care",
                "Mental health and wellness programs",
                "Rehabilitation and physical therapy services"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 text-lg font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Stethoscope className="w-16 h-16 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Advanced Care</h3>
                  <p className="text-gray-600">State-of-the-art facilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onBookAppointment={() => setShowAppointmentModal(true)} />

      {/* Appointment Modal */}
      <Modal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        title="Book Your Service"
        size="max-w-2xl"
      >
        <form onSubmit={handleAppointmentSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
              <input
                type="text"
                placeholder="Your first name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                placeholder="Your last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Needed *</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a service</option>
              <option value="General Consultation">General Consultation ($100-$200)</option>
              <option value="Cardiology">Cardiology ($150-$300)</option>
              <option value="Pediatrics">Pediatrics ($120-$250)</option>
              <option value="Emergency Care">Emergency Care ($200-$500)</option>
              <option value="Surgery">Surgery ($500-$2000)</option>
              <option value="Internal Medicine">Internal Medicine ($130-$280)</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date *</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time *</label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select time</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
            <textarea
              placeholder="Tell us about your symptoms or any specific concerns..."
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => setShowAppointmentModal(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-300 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition font-semibold flex items-center justify-center"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Service
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Services;
