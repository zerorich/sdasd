import React, { useState, useEffect } from 'react';
import {
  Star,
  Calendar,
  ArrowRight,
  Users,
  Award,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Modal from '../components/Modal';
import CTASection from '../components/CTASection';
import api from '../utils/api';

const Doctors = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
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

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [doctorsResponse, servicesResponse] = await Promise.all([
          api.getDoctors({ limit: 6 }),
          api.getServices({ limit: 10 })
        ]);
        setDoctors(doctorsResponse.doctors || []);
        setServices(servicesResponse.services || []);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      // For now, just show success message
      // In real app, this would submit to contact form
      alert(`Appointment request submitted!\n\nDoctor: ${selectedDoctor || 'Any Available Doctor'}\nDate: ${formData.date}\nTime: ${formData.time}\nService: ${formData.service}`);
      setShowAppointmentModal(false);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
      });
      setSelectedDoctor(null);
    } catch (error) {
      console.error('Failed to submit appointment:', error);
      alert('Failed to submit appointment. Please try again.');
    }
  };

  const handleDoctorAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowAppointmentModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title="Meet Our Expert Doctors - Experienced Medical Professionals | Medicio"
        description="Meet our team of highly qualified and experienced doctors. Board-certified physicians and specialists dedicated to providing exceptional medical care and personalized treatment."
        keywords="doctors, physicians, medical professionals, cardiologist, pediatrician, surgeon, emergency medicine, medical specialists, healthcare team"
        canonicalUrl={`${window.location.origin}/doctors`}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Medical Team
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              Meet Our Expert
              <span className="text-blue-600 block">Doctors</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Our team of highly qualified and experienced medical professionals are dedicated to providing you with the best possible care. Each doctor brings unique expertise and a commitment to excellence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setShowAppointmentModal(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book with Any Doctor
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 font-semibold">
                View All Specialties
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">50+</div>
              <div className="text-gray-600 font-medium">Expert Doctors</div>
            </div>
            <div className="text-center p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">15+</div>
              <div className="text-gray-600 font-medium">Specialties</div>
            </div>
            <div className="text-center p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">4.8+</div>
              <div className="text-gray-600 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                {/* Doctor Image */}
                <div className="h-80 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                  <div className="text-8xl">👩‍⚕️</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Doctor Info */}
                <div className="p-8 space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Dr. {doctor.user?.firstName} {doctor.user?.lastName}
                    </h3>
                    <p className="text-blue-600 font-semibold text-lg mb-1">{doctor.specialty}</p>
                    <p className="text-gray-600 mb-2">{doctor.experience}+ years experience</p>
                    <p className="text-gray-500 text-sm">{doctor.education?.[0]?.institution || 'Medical School'}</p>
                  </div>

                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {doctor.bio || 'Experienced medical professional dedicated to providing quality healthcare.'}
                  </p>

                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 font-medium">Consultation Fee: ${doctor.consultationFee}</p>
                    <p className="text-sm text-gray-500">{doctor.department}</p>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{doctor.user?.phone || 'Contact for details'}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center py-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(doctor.rating?.average || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{doctor.rating?.average?.toFixed(1) || '0.0'}/5</span>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{doctor.rating?.count || 0}+</div>
                      <span className="text-sm text-gray-600">Reviews</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDoctorAppointment(doctor)}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                  >
                    Book with Dr. {doctor.user?.lastName}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Doctors Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Why Choose Our Doctors
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Excellence in
              <span className="text-blue-600 block">Medical Care</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our doctors are carefully selected for their expertise, compassion, and commitment to providing exceptional patient care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Board-certified physicians with advanced training",
              "Years of experience in their respective specialties",
              "Commitment to continuing medical education",
              "Patient-centered approach to healthcare",
              "Use of latest medical technologies and treatments",
              "Multilingual staff for diverse patient needs"
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 text-lg font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection onBookAppointment={() => setShowAppointmentModal(true)} />

      {/* Appointment Modal */}
      <Modal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        title="Book Your Appointment"
        size="max-w-2xl"
      >
        <form onSubmit={handleAppointmentSubmit} className="space-y-6">
          {selectedDoctor && (
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <p className="text-blue-800 font-semibold">
                Selected Doctor: Dr. {selectedDoctor.user?.firstName} {selectedDoctor.user?.lastName} - {selectedDoctor.specialty}
              </p>
            </div>
          )}

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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Needed *</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service._id} value={service.name}>
                  {service.name} (${service.priceRange?.min}-${service.priceRange?.max})
                </option>
              ))}
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
              Book Appointment
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Doctors;
