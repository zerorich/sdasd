import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Calendar,
  ArrowRight,
  Play,
  Heart,
  Users,
  Award,
  Clock,
  Star,
  Activity,
  UserCheck,
  Stethoscope,
  Ambulance
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Modal from '../components/Modal';
import CTASection from '../components/CTASection';
import api from '../utils/api';

const Home = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
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
          api.getTopRatedDoctors(3),
          api.getPopularServices(6)
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
      // Convert time format from "9:00 AM" to "09:00"
      const convertTo24Hour = (time12h) => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
          hours = '00';
        }
        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12;
        }
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
      };

      // Map service names to potential IDs (you'll need to replace these with actual IDs from your database)
      const serviceMapping = {
        'General Consultation': '507f1f77bcf86cd799439013',
        'Cardiology': '507f1f77bcf86cd799439014', 
        'Pediatrics': '507f1f77bcf86cd799439015',
        'Emergency Care': '507f1f77bcf86cd799439016',
        'Surgery': '507f1f77bcf86cd799439017',
        'Internal Medicine': '507f1f77bcf86cd799439018'
      };

      // Prepare appointment data according to your backend schema
      const appointmentData = {
        // Create or find patient data - you might want to create a patient first
        patient: '507f1f77bcf86cd799439011', // Replace with actual patient ID
        doctor: '507f1f77bcf86cd799439012', // Replace with selected doctor ID
        service: serviceMapping[formData.service] || '507f1f77bcf86cd799439013',
        appointmentDate: formData.date,
        appointmentTime: convertTo24Hour(formData.time),
        notes: formData.message,
        type: 'consultation',
        metadata: {
          bookingSource: 'website',
          ipAddress: '127.0.0.1', // You might want to get real IP
          userAgent: navigator.userAgent
        }
      };

      const response = await fetch('https://sdasd-production-42f7.up.railway.app/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // IMPORTANT: Your backend requires admin authorization for this endpoint
          // You need to either:
          // 1. Create a public endpoint for patient bookings
          // 2. Add authentication token here
          // 3. Modify the backend to allow public bookings
          // 'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Appointment booked successfully!\n\nDate: ${formData.date}\nTime: ${formData.time}\nService: ${formData.service}\n\nAppointment ID: ${result.appointment._id}`);
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
      } else {
        const error = await response.json();
        alert(`Error booking appointment: ${error.message || 'Please try again later'}`);
        console.error('Backend error:', error);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment. Please check your connection and try again.');
    }
  };

  const stats = [
    { number: "25+", label: "Years Experience", icon: Award },
    { number: "50+", label: "Expert Doctors", icon: Users },
    { number: "10k+", label: "Happy Patients", icon: Heart },
    { number: "24/7", label: "Emergency Care", icon: Clock }
  ];

  const featuredServices = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Comprehensive heart care with advanced cardiac treatments and interventions.",
      features: ["ECG & Echo", "Heart Surgery", "Preventive Care"],
      price: "$150 - $300"
    },
    {
      icon: Activity,
      title: "Emergency Medicine",
      description: "24/7 emergency care with rapid response and critical care services.",
      features: ["Trauma Care", "ICU Services", "Ambulance"],
      price: "$200 - $500"
    },
    {
      icon: UserCheck,
      title: "General Medicine",
      description: "Complete primary healthcare services for patients of all ages.",
      features: ["Health Checkups", "Vaccinations", "Chronic Care"],
      price: "$100 - $200"
    }
  ];

  const featuredDoctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Chief Cardiologist",
      experience: "15+ years experience",
      image: "👩‍⚕️",
      rating: 4.9,
      patients: "2000+",
      description: "Specialized in interventional cardiology and heart disease prevention.",
      education: "Harvard Medical School"
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Pediatric Specialist",
      experience: "12+ years experience",
      image: "👨‍⚕️",
      rating: 4.8,
      patients: "1500+",
      description: "Expert in child healthcare and developmental medicine.",
      education: "Johns Hopkins University"
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Emergency Medicine",
      experience: "10+ years experience",
      image: "👩‍⚕️",
      rating: 4.9,
      patients: "3000+",
      description: "Leading emergency care physician with trauma expertise.",
      education: "Mayo Clinic College"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Medicio Healthcare - Excellence in Medical Care"
        description="Medicio Healthcare provides exceptional medical services with experienced doctors, modern facilities, and compassionate care. Book your appointment today for comprehensive healthcare solutions."
        keywords="healthcare, medical services, doctors, hospital, clinic, emergency care, cardiology, pediatrics, surgery, medical appointment"
        canonicalUrl={window.location.origin}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Trusted Healthcare Provider
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Health is Our
                  <span className="text-blue-600 block">Top Priority</span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  We provide world-class healthcare services with experienced doctors, modern facilities, and compassionate care to ensure your complete wellbeing.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowAppointmentModal(true)}
                  className="group bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setShowVideoModal(true)}
                  className="group flex items-center justify-center border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 font-semibold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Video
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="relative z-10">
                <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
                  <div className="text-center z-10">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                      <Heart className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">Healthcare Excellence</h3>
                    <p className="text-blue-100">Caring for your health with dedication</p>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-8 right-8 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-12 left-8 w-6 h-6 bg-white/20 rounded-full animate-pulse delay-300"></div>
                  <div className="absolute top-1/3 left-12 w-3 h-3 bg-white/40 rounded-full animate-pulse delay-700"></div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">10K+</div>
                    <div className="text-sm text-gray-600">Happy Patients</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">Award</div>
                    <div className="text-sm text-gray-600">Winning Care</div>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group text-center p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Services
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Featured Healthcare
              <span className="text-blue-600 block">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular medical services designed to meet your healthcare needs with excellence and compassion.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <div className="text-blue-600 font-bold text-lg mb-4">{service.price}</div>
                  </div>

                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
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
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Medical Team
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Expert
              <span className="text-blue-600 block">Doctors</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of highly qualified and experienced medical professionals are dedicated to providing you with the best possible care.
            </p>
          </div>

          {/* Doctors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDoctors.map((doctor, index) => (
              <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                {/* Doctor Image */}
                <div className="h-80 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                  <div className="text-8xl">{doctor.image}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Doctor Info */}
                <div className="p-8 space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                    <p className="text-blue-600 font-semibold text-lg mb-1">{doctor.specialty}</p>
                    <p className="text-gray-600 mb-2">{doctor.experience}</p>
                    <p className="text-gray-500 text-sm">{doctor.education}</p>
                  </div>

                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {doctor.description}
                  </p>

                  {/* Stats */}
                  <div className="flex justify-between items-center py-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{doctor.rating}/5</span>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{doctor.patients}</div>
                      <span className="text-sm text-gray-600">Patients</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowAppointmentModal(true)}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                  >
                    Book Appointment
                  </button>
                </div>
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
              Book Appointment
            </button>
          </div>
        </form>
      </Modal>

      {/* Video Modal */}
      <Modal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        title="About Medicio Healthcare"
        size="max-w-4xl"
      >
        <div className="space-y-6">
          <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="text-center z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">Welcome to Medicio</h3>
              <p className="text-blue-100">Experience Excellence in Healthcare</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                To provide exceptional, compassionate healthcare services that improve the quality of life for our patients and strengthen our community through innovative medical practices and personalized care.
              </p>

              <h4 className="text-xl font-bold text-gray-900 mb-4">Our Values</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Compassionate Care</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Medical Excellence</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Patient-First Approach</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Innovation & Technology</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                To be the leading healthcare provider in our region, recognized for our commitment to excellence, innovation, and the highest standards of patient care and medical outcomes.
              </p>

              <h4 className="text-xl font-bold text-gray-900 mb-4">Key Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">25+</div>
                  <div className="text-sm text-gray-600">Years Serving</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">50+</div>
                  <div className="text-sm text-gray-600">Expert Doctors</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">10K+</div>
                  <div className="text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600">Emergency Care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Home;
