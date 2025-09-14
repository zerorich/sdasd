import React, { useState } from 'react';
import {
  CheckCircle,
  Heart,
  Shield,
  Users,
  Award,
  Clock,
  Stethoscope,
  Calendar,
  ArrowRight,
  Star,
  Target,
  Lightbulb,
  HandHeart
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Modal from '../components/Modal';
import CTASection from '../components/CTASection';

const About = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare appointment data according to your backend schema
      const appointmentData = {
        // You'll need to map these to actual ObjectIds from your database
        patient: '507f1f77bcf86cd799439011', // This should be the actual patient ID
        doctor: '507f1f77bcf86cd799439012', // This should be the actual doctor ID  
        service: '507f1f77bcf86cd799439013', // This should be the actual service ID
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        notes: formData.message,
        type: 'consultation',
        metadata: {
          bookingSource: 'website',
          ipAddress: 'client-ip',
          userAgent: navigator.userAgent
        }
      };

      const response = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may need to add authorization header for admin access
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        const result = await response.json();
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
      } else {
        const error = await response.json();
        alert(`Error booking appointment: ${error.message || 'Please try again later'}`);
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

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We treat every patient with empathy, understanding, and genuine concern for their wellbeing and comfort."
    },
    {
      icon: Shield,
      title: "Medical Excellence",
      description: "Our commitment to the highest standards of medical practice ensures exceptional outcomes and patient safety."
    },
    {
      icon: Users,
      title: "Patient-Centered Approach",
      description: "Every decision we make is guided by what's best for our patients and their families."
    },
    {
      icon: Lightbulb,
      title: "Innovation & Technology",
      description: "We embrace cutting-edge medical technology and innovative treatment methods to provide the best care possible."
    }
  ];

  const milestones = [
    {
      year: "2000",
      title: "Founded",
      description: "Medicio Healthcare was established with a vision to provide exceptional medical care to our community."
    },
    {
      year: "2005",
      title: "First Expansion",
      description: "Added specialized departments including cardiology and emergency medicine services."
    },
    {
      year: "2010",
      title: "Technology Upgrade",
      description: "Implemented state-of-the-art medical equipment and digital health records system."
    },
    {
      year: "2015",
      title: "Award Recognition",
      description: "Received the 'Best Hospital Award' for outstanding patient care and medical excellence."
    },
    {
      year: "2020",
      title: "Pandemic Response",
      description: "Led community response during COVID-19, providing critical care and vaccination services."
    },
    {
      year: "2024",
      title: "25th Anniversary",
      description: "Celebrating 25 years of dedicated service to our community's health and wellbeing."
    }
  ];

  const leadership = [
    {
      name: "Dr. Sarah Johnson",
      position: "Chief Medical Officer",
      image: "👩‍⚕️",
      experience: "20+ years",
      education: "Harvard Medical School",
      specialty: "Cardiology & Administration"
    },
    {
      name: "Dr. Michael Chen",
      position: "Head of Pediatrics",
      image: "👨‍⚕️",
      experience: "18+ years",
      education: "Johns Hopkins University",
      specialty: "Pediatric Medicine"
    },
    {
      name: "Dr. Emily Rodriguez",
      position: "Emergency Medicine Director",
      image: "👩‍⚕️",
      experience: "15+ years",
      education: "Mayo Clinic College",
      specialty: "Emergency & Critical Care"
    }
  ];

  return (
    <>
      <SEOHead 
        title="About Medicio Healthcare - 25+ Years of Medical Excellence"
        description="Learn about Medicio Healthcare's 25+ year journey of providing exceptional medical care. Discover our mission, values, and commitment to patient-centered healthcare excellence."
        keywords="about medicio, healthcare history, medical excellence, patient care, hospital mission, medical team, healthcare values"
        canonicalUrl={`${window.location.origin}/about`}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              About Medicio Healthcare
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              25+ Years of
              <span className="text-blue-600 block">Healthcare Excellence</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Since 2000, Medicio Healthcare has been at the forefront of healthcare innovation, providing exceptional medical services to our community. We combine traditional medical excellence with cutting-edge technology to deliver personalized, compassionate care.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setShowAppointmentModal(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Your Visit
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 font-semibold">
                Our Mission & Vision
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Mission & Vision Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <div className="relative">
              <div className="relative z-10">
                <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden">
                  <div className="text-center">
                    <div className="w-40 h-40 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl backdrop-blur-sm">
                      <Stethoscope className="w-20 h-20 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">Medical Excellence</h3>
                    <p className="text-gray-600">Since 2000</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-8 -left-8 w-24 h-24 bg-blue-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-200 rounded-full opacity-60"></div>
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Our Mission & Vision for
                  <span className="text-blue-600 block">Better Healthcare</span>
                </h2>

                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Target className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                          To provide exceptional, compassionate healthcare services that improve the quality of life for our patients and strengthen our community through innovative medical practices and personalized care.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                          To be the leading healthcare provider in our region, recognized for our commitment to excellence, innovation, and the highest standards of patient care and medical outcomes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Core Values
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Drives Us
              <span className="text-blue-600 block">Every Day</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values guide every interaction, every decision, and every aspect of care we provide to our patients and community.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group p-8 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Our Journey
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Milestones in
              <span className="text-blue-600 block">Healthcare Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A timeline of our growth, achievements, and commitment to advancing healthcare in our community.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>

            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Leadership Team
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Meet Our
              <span className="text-blue-600 block">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced leadership team brings together decades of medical expertise and administrative excellence to guide our organization.
            </p>
          </div>

          {/* Leadership Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                {/* Leader Image */}
                <div className="h-80 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                  <div className="text-8xl">{leader.image}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Leader Info */}
                <div className="p-8 space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                    <p className="text-blue-600 font-semibold text-lg mb-2">{leader.position}</p>
                    <p className="text-gray-600 mb-2">{leader.experience}</p>
                    <p className="text-gray-500 text-sm">{leader.education}</p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Specialty</h4>
                    <p className="text-blue-700 text-sm">{leader.specialty}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              What Sets Us Apart
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Excellence in
              <span className="text-blue-600 block">Every Aspect</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "State-of-the-art medical equipment and facilities",
              "Board-certified physicians and specialists",
              "Comprehensive preventive care programs",
              "24/7 emergency medical services",
              "Patient-centered approach to healthcare",
              "Advanced diagnostic and treatment capabilities"
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
    </>
  );
};

export default About;
