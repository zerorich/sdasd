const express = require('express');
const Doctor = require('../models/Doctor');
const { asyncHandler } = require('../middleware/errorHandler');
const { protect, authorize } = require('../middleware/auth');
const { validateObjectId, validatePagination } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = asyncHandler(async (req, res) => {
  const { specialty, page = 1, limit = 10, sort = '-rating.average' } = req.query;

  let query = { isActive: true, isVerified: true };
  if (specialty) {
    query.specialty = specialty;
  }

  const doctors = await Doctor.find(query)
    .populate('user', 'firstName lastName phone avatar')
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Doctor.countDocuments(query);

  res.json({
    success: true,
    count: doctors.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    doctors
  });
});

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
const getDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id)
    .populate('user', 'firstName lastName phone avatar');

  if (!doctor || !doctor.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Doctor not found'
    });
  }

  res.json({
    success: true,
    doctor
  });
});

// @desc    Get doctors by specialty
// @route   GET /api/doctors/specialty/:specialty
// @access  Public
const getDoctorsBySpecialty = asyncHandler(async (req, res) => {
  const { specialty } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const doctors = await Doctor.getBySpecialty(specialty)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Doctor.countDocuments({ specialty, isActive: true, isVerified: true });

  res.json({
    success: true,
    count: doctors.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    specialty,
    doctors
  });
});

// @desc    Get top rated doctors
// @route   GET /api/doctors/top-rated
// @access  Public
const getTopRatedDoctors = asyncHandler(async (req, res) => {
  const { limit = 10 } = req.query;

  const doctors = await Doctor.getTopRated(parseInt(limit));

  res.json({
    success: true,
    count: doctors.length,
    doctors
  });
});

// @desc    Create doctor profile
// @route   POST /api/doctors
// @access  Private (Doctor)
const createDoctorProfile = asyncHandler(async (req, res) => {
  // Check if user already has a doctor profile
  const existingDoctor = await Doctor.findOne({ user: req.user.id });
  if (existingDoctor) {
    return res.status(400).json({
      success: false,
      message: 'Doctor profile already exists'
    });
  }

  // Create doctor profile
  const doctor = await Doctor.create({
    ...req.body,
    user: req.user.id
  });

  const populatedDoctor = await Doctor.findById(doctor._id)
    .populate('user', 'firstName lastName phone avatar');

  res.status(201).json({
    success: true,
    message: 'Doctor profile created successfully',
    doctor: populatedDoctor
  });
});

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private (Doctor/Admin)
const updateDoctorProfile = asyncHandler(async (req, res) => {
  let doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: 'Doctor profile not found'
    });
  }

  // Check authorization
  if (doctor.user.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to update this doctor profile'
    });
  }

  doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('user', 'firstName lastName email phone avatar');

  res.json({
    success: true,
    message: 'Doctor profile updated successfully',
    doctor
  });
});

// @desc    Delete doctor profile
// @route   DELETE /api/doctors/:id
// @access  Private (Admin)
const deleteDoctorProfile = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return res.status(404).json({
      success: false,
      message: 'Doctor profile not found'
    });
  }

  await Doctor.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Doctor profile deleted successfully'
  });
});

// @desc    Get doctor specialties
// @route   GET /api/doctors/specialties
// @access  Public
const getSpecialties = asyncHandler(async (req, res) => {
  const specialties = await Doctor.distinct('specialty', { isActive: true, isVerified: true });

  res.json({
    success: true,
    specialties
  });
});

// Apply validation middleware
// Public routes (GET only)
router.get('/', validatePagination, getDoctors);
router.get('/top-rated', getTopRatedDoctors);
router.get('/specialties', getSpecialties);
router.get('/specialty/:specialty', validatePagination, getDoctorsBySpecialty);
router.get('/:id', validateObjectId('id'), getDoctor);

// Admin only routes (CRUD operations)
router.post('/', protect, authorize('admin'), createDoctorProfile);
router.put('/:id', protect, authorize('admin'), validateObjectId('id'), updateDoctorProfile);
router.delete('/:id', protect, authorize('admin'), validateObjectId('id'), deleteDoctorProfile);

module.exports = router;
