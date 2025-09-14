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
const { protect, authorize } = require('../middleware/auth');
const { validateAppointment, validateObjectId } = require('../middleware/validation');

const router = express.Router();

// Public routes (GET only)
router.get('/', getAppointments);
router.get('/availability/:doctorId', getAvailability);
router.get('/:id', validateObjectId('id'), getAppointment);
router.get('/doctor/:doctorId', validateObjectId('doctorId'), getDoctorAppointments);

// Admin only routes (CRUD operations)
router.post('/', protect, authorize('admin'), validateAppointment, createAppointment);
router.put('/:id', protect, authorize('admin'), validateObjectId('id'), updateAppointment);
router.put('/:id/cancel', protect, authorize('admin'), validateObjectId('id'), cancelAppointment);
router.put('/:id/reschedule', protect, authorize('admin'), validateObjectId('id'), rescheduleAppointment);

module.exports = router;
