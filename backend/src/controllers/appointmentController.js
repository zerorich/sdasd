const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Service = require('../models/Service');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = asyncHandler(async (req, res) => {
  const {
    doctor,
    service,
    appointmentDate,
    appointmentTime,
    type,
    notes,
    symptoms
  } = req.body;

  // Check if doctor exists and is active
  const doctorExists = await Doctor.findById(doctor)
    .populate('user', 'firstName lastName phone');
  
  if (!doctorExists || !doctorExists.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Doctor not found or inactive'
    });
  }

  // Check if service exists and is active
  const serviceExists = await Service.findById(service);
  if (!serviceExists || !serviceExists.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Service not found or inactive'
    });
  }

  // Check availability
  const existingAppointment = await Appointment.checkAvailability(
    doctor,
    appointmentDate,
    appointmentTime
  );

  if (existingAppointment) {
    return res.status(400).json({
      success: false,
      message: 'Time slot is not available'
    });
  }

  // Create appointment
  const appointment = await Appointment.create({
    patient: req.body.patient || null, // Optional patient ID for admin
    doctor,
    service,
    appointmentDate,
    appointmentTime,
    type,
    notes,
    symptoms,
    duration: serviceExists.duration,
    amount: serviceExists.priceRange.min // Use minimum price for now
  });

  // Populate appointment data
  const populatedAppointment = await Appointment.findById(appointment._id)
    .populate('patient', 'firstName lastName phone')
    .populate('doctor', 'specialty')
    .populate('service', 'name duration priceRange');


  res.status(201).json({
    success: true,
    message: 'Appointment booked successfully',
    appointment: populatedAppointment
  });
});

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Public
const getAppointments = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  let query = {};
  if (status) {
    query.status = status;
  }

  const appointments = await Appointment.find(query)
    .populate('doctor', 'specialty')
    .populate('service', 'name duration priceRange')
    .sort({ appointmentDate: -1, appointmentTime: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Appointment.countDocuments(query);

  res.json({
    success: true,
    count: appointments.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    appointments
  });
});

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Public
const getAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('patient', 'firstName lastName phone')
    .populate('doctor', 'specialty')
    .populate('service', 'name duration priceRange');

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  res.json({
    success: true,
    appointment
  });
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = asyncHandler(async (req, res) => {
  let appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  // Admin only operation - authorization handled by middleware

  // Check if appointment can be modified
  if (!appointment.canBeCancelled && req.body.status === 'cancelled') {
    return res.status(400).json({
      success: false,
      message: 'Appointment cannot be cancelled less than 24 hours before the scheduled time'
    });
  }

  // Update appointment
  appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )
    .populate('patient', 'firstName lastName phone')
    .populate('doctor', 'specialty')
    .populate('service', 'name duration priceRange');

  res.json({
    success: true,
    message: 'Appointment updated successfully',
    appointment
  });
});

// @desc    Cancel appointment
// @route   PUT /api/appointments/:id/cancel
// @access  Private
const cancelAppointment = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  // Admin only operation - authorization handled by middleware

  // Check if appointment can be cancelled
  if (!appointment.canBeCancelled) {
    return res.status(400).json({
      success: false,
      message: 'Appointment cannot be cancelled less than 24 hours before the scheduled time'
    });
  }

  // Cancel appointment
  await appointment.cancel(reason, 'admin');

  res.json({
    success: true,
    message: 'Appointment cancelled successfully'
  });
});

// @desc    Reschedule appointment
// @route   PUT /api/appointments/:id/reschedule
// @access  Private
const rescheduleAppointment = asyncHandler(async (req, res) => {
  const { appointmentDate, appointmentTime } = req.body;

  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return res.status(404).json({
      success: false,
      message: 'Appointment not found'
    });
  }

  // Admin only operation - authorization handled by middleware

  // Check if new time is available
  const existingAppointment = await Appointment.checkAvailability(
    appointment.doctor,
    appointmentDate,
    appointmentTime
  );

  if (existingAppointment && existingAppointment._id.toString() !== appointment._id.toString()) {
    return res.status(400).json({
      success: false,
      message: 'New time slot is not available'
    });
  }

  // Reschedule appointment
  await appointment.reschedule(appointmentDate, appointmentTime);

  const updatedAppointment = await Appointment.findById(appointment._id)
    .populate('patient', 'firstName lastName phone')
    .populate('doctor', 'specialty')
    .populate('service', 'name duration priceRange');

  res.json({
    success: true,
    message: 'Appointment rescheduled successfully',
    appointment: updatedAppointment
  });
});

// @desc    Get doctor's appointments
// @route   GET /api/appointments/doctor/:doctorId
// @access  Public
const getDoctorAppointments = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const { date, status, page = 1, limit = 10 } = req.query;

  let query = { doctor: doctorId };
  
  if (date) {
    query.appointmentDate = new Date(date);
  }
  
  if (status) {
    query.status = status;
  }

  const appointments = await Appointment.find(query)
    .populate('patient', 'firstName lastName phone')
    .populate('service', 'name duration priceRange')
    .sort({ appointmentDate: 1, appointmentTime: 1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Appointment.countDocuments(query);

  res.json({
    success: true,
    count: appointments.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    appointments
  });
});

// @desc    Get available time slots for a doctor on a specific date
// @route   GET /api/appointments/availability/:doctorId
// @access  Public
const getAvailability = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({
      success: false,
      message: 'Date is required'
    });
  }

  const doctor = await Doctor.findById(doctorId);
  if (!doctor || !doctor.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Doctor not found or inactive'
    });
  }

  // Get existing appointments for the date
  const existingAppointments = await Appointment.find({
    doctor: doctorId,
    appointmentDate: new Date(date),
    status: { $in: ['scheduled', 'confirmed'] }
  });

  // Get booked time slots
  const bookedSlots = existingAppointments.map(apt => apt.appointmentTime);

  // Generate available time slots (assuming 30-minute intervals)
  const availableSlots = [];
  const startTime = 9; // 9 AM
  const endTime = 17; // 5 PM

  for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      if (!bookedSlots.includes(timeString)) {
        availableSlots.push(timeString);
      }
    }
  }

  res.json({
    success: true,
    date,
    doctorId,
    availableSlots,
    totalSlots: availableSlots.length
  });
});

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment,
  rescheduleAppointment,
  getDoctorAppointments,
  getAvailability
};
