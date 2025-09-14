const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Doctors
  async getDoctors(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.get(`/doctors${queryString ? `?${queryString}` : ''}`);
  }

  async getDoctor(id) {
    return this.get(`/doctors/${id}`);
  }

  async getSpecialties() {
    return this.get('/doctors/specialties');
  }

  async getTopRatedDoctors(limit = 10) {
    return this.get(`/doctors/top-rated?limit=${limit}`);
  }

  // Services
  async getServices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.get(`/services${queryString ? `?${queryString}` : ''}`);
  }

  async getService(id) {
    return this.get(`/services/${id}`);
  }

  async getCategories() {
    return this.get('/services/categories');
  }

  async getPopularServices(limit = 6) {
    return this.get(`/services/popular?limit=${limit}`);
  }

  async searchServices(query, params = {}) {
    const searchParams = new URLSearchParams({ q: query, ...params }).toString();
    return this.get(`/services/search?${searchParams}`);
  }

  // Appointments
  async getAppointments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.get(`/appointments${queryString ? `?${queryString}` : ''}`);
  }

  async getAppointment(id) {
    return this.get(`/appointments/${id}`);
  }

  async getDoctorAppointments(doctorId, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.get(`/appointments/doctor/${doctorId}${queryString ? `?${queryString}` : ''}`);
  }

  async getAvailability(doctorId, date) {
    return this.get(`/appointments/availability/${doctorId}?date=${date}`);
  }

  async createAppointment(appointmentData) {
    return this.post('/appointments', appointmentData);
  }

  // Contact
  async submitContactForm(formData) {
    return this.post('/contact', formData);
  }
}

export default new ApiService();
