import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  User,
  Send
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Modal from '../components/Modal';
import CTASection from '../components/CTASection';
import api from '../utils/api';

const Contact = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    subject: '',
    message: '',
    service: 'General Inquiry'
  });
  const [messageFormData, setMessageFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    subject: '',
    message: '',
    service: 'General Inquiry'
  });
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    try {
      // For now, just show success message
      alert(`Appointment request submitted!\n\nDate: ${formData.date}\nTime: ${formData.time}\nService: ${formData.service}`);
      setShowAppointmentModal(false);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        subject: '',
        message: '',
        service: 'General Inquiry'
      });
    } catch (error) {
      console.error('Failed to submit appointment:', error);
      alert('Failed to submit appointment. Please try again.');
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.submitContactForm(messageFormData);
      alert('Message sent successfully! We will get back to you within 24 hours.');
      setShowMessageModal(false);
      setMessageFormData({
        firstName: '',
        lastName: '',
        phone: '',
        subject: '',
        message: '',
        service: 'General Inquiry'
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent successfully!\n\nWe'll get back to you within 24 hours at ${contactForm.email}`);
    setContactForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Clinic",
      description: "123 Medical Street, Healthcare City, HC 12345",
      subtitle: "Open 24/7 for emergencies",
      color: "blue"
    },
    {
      icon: Phone,
      title: "Call Us Now",
      description: "+1 (555) 123-4567",
      subtitle: "Available 24/7 for emergencies",
      color: "green"
    },
    {
      icon: Mail,
      title: "Send Message",
      description: "info@medicio.com",
      subtitle: "We'll respond within 24 hours",
      color: "purple"
    },
    {
      icon: Clock,
      title: "Working Hours",
      description: "Mon - Fri: 8:00 AM - 8:00 PM",
      subtitle: "Emergency: 24/7",
      color: "orange"
    }
  ];

  const departments = [
    {
      name: "Emergency Department",
      phone: "(555) 123-4567",
      email: "emergency@medicio.com",
      hours: "24/7"
    },
    {
      name: "Cardiology",
      phone: "(555) 123-4568",
      email: "cardiology@medicio.com",
      hours: "Mon-Fri: 9AM-5PM"
    },
    {
      name: "Pediatrics",
      phone: "(555) 123-4569",
      email: "pediatrics@medicio.com",
      hours: "Mon-Sat: 8AM-6PM"
    },
    {
      name: "Surgery",
      phone: "(555) 123-4570",
      email: "surgery@medicio.com",
      hours: "Mon-Fri: 7AM-3PM"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Contact Medicio Healthcare - Get in Touch Today"
        description="Contact Medicio Healthcare for appointments, inquiries, or emergency care. Multiple ways to reach us including phone, email, and our contact form. Available 24/7 for emergencies."
        keywords="contact medicio, healthcare contact, medical appointment, emergency contact, hospital phone number, medical inquiry, healthcare support"
        canonicalUrl={`${window.location.origin}/contact`}
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Get In Touch
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
              Contact Us
              <span className="text-blue-600 block">Today</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              Have questions about our services or need to schedule an appointment? We're here to help you every step of the way. Reach out to us through any of the methods below.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => setShowAppointmentModal(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <button
                onClick={() => setShowMessageModal(true)}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 font-semibold flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="group p-8 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-r ${
                  info.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  info.color === 'green' ? 'from-green-500 to-green-600' :
                  info.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  'from-orange-500 to-orange-600'
                } rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-blue-600 transition-colors">
                  {info.title}
                </h3>
                
                <p className="text-gray-600 text-center mb-2 font-semibold">
                  {info.description}
                </p>
                
                <p className="text-gray-500 text-center text-sm">
                  {info.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Get in Touch with
                  <span className="text-blue-600 block">Our Team</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  We're here to help with any questions or concerns you may have. Choose the most convenient way to reach us.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className={`flex items-start gap-6 p-6 bg-gradient-to-r ${
                    info.color === 'blue' ? 'from-blue-50 to-blue-100' :
                    info.color === 'green' ? 'from-green-50 to-green-100' :
                    info.color === 'purple' ? 'from-purple-50 to-purple-100' :
                    'from-orange-50 to-orange-100'
                  } rounded-2xl`}>
                    <div className={`w-14 h-14 ${
                      info.color === 'blue' ? 'bg-blue-600' :
                      info.color === 'green' ? 'bg-green-600' :
                      info.color === 'purple' ? 'bg-purple-600' :
                      'bg-orange-600'
                    } rounded-2xl flex items-center justify-center shadow-lg`}>
                      <info.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{info.title}</h3>
                      <p className="text-gray-600 text-lg">{info.description}</p>
                      <p className="text-gray-500 mt-1">{info.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
                <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                      className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Service Interested In</label>
                  <select
                    value={contactForm.service}
                    onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm"
                  >
                    <option value="">Select a service</option>
                    <option value="General Consultation">General Consultation</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Emergency Care">Emergency Care</option>
                    <option value="Surgery">Surgery</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea
                    placeholder="Tell us about your inquiry or how we can help you..."
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white shadow-sm resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Department Contacts
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Direct Department
              <span className="text-blue-600 block">Contacts</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              For specific medical needs, you can contact our departments directly. Our specialized teams are ready to assist you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {dept.name}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{dept.phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{dept.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{dept.hours}</span>
                    </div>
                  </div>
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

      {/* Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        title="Send Quick Message"
        size="max-w-lg"
      >
        <form onSubmit={handleContactSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={contactForm.firstName}
              onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              placeholder="(555) 123-4567"
              value={contactForm.phone}
              onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
            <textarea
              placeholder="How can we help you today?"
              rows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h5 className="font-semibold text-blue-900">Quick Response</h5>
                <p className="text-blue-700 text-sm">We typically respond to messages within 2-4 hours during business hours.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setShowMessageModal(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-300 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition font-semibold flex items-center justify-center"
            >
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Contact;
