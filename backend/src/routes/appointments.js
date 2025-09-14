const express = require('express');
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  rescheduleAppointment,
  getDoctorAppointments,
  getAvailability
} = require('../controllers/appointmentController');
// Auth middleware removed - no authentication required
const { validateAppointment, validateObjectId } = require('../middleware/validation');

const router = express.Router();

// Public routes (GET and POST for clients)
router.get('/', getAppointments);
router.get('/availability/:doctorId', getAvailability);
router.get('/:id', validateObjectId('id'), getAppointment);
router.get('/doctor/:doctorId', validateObjectId('doctorId'), getDoctorAppointments);
router.post('/', validateAppointment, createAppointment); // Public for client appointments

// All routes are now public (no authentication required)
router.put('/:id', validateObjectId('id'), updateAppointment);
router.put('/:id/cancel', validateObjectId('id'), cancelAppointment);
router.put('/:id/reschedule', validateObjectId('id'), rescheduleAppointment);

module.exports = router;
