const { body, param, query, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Validate MongoDB ObjectId
const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// User validation rules
const validateUserRegistration = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('role')
    .optional()
    .isIn(['patient', 'doctor', 'admin'])
    .withMessage('Invalid role specified'),
  
  handleValidationErrors
];

const validateUserLogin = [
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  handleValidationErrors
];

const validateUserUpdate = [
  body('firstName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('First name cannot be empty')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  
  body('lastName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Last name cannot be empty')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date of birth'),
  
  body('gender')
    .optional()
    .isIn(['male', 'female', 'other'])
    .withMessage('Invalid gender specified'),
  
  handleValidationErrors
];

// Doctor validation rules
const validateDoctorRegistration = [
  body('specialty')
    .notEmpty()
    .withMessage('Specialty is required')
    .isIn([
      'Cardiology', 'Emergency Medicine', 'General Medicine', 'Pediatrics',
      'Internal Medicine', 'Surgery', 'Orthopedics', 'Dermatology',
      'Neurology', 'Oncology', 'Psychiatry', 'Radiology',
      'Anesthesiology', 'Pathology', 'Ophthalmology'
    ])
    .withMessage('Invalid specialty'),
  
  body('licenseNumber')
    .notEmpty()
    .withMessage('License number is required')
    .isLength({ min: 5, max: 20 })
    .withMessage('License number must be between 5 and 20 characters'),
  
  body('experience')
    .isInt({ min: 0, max: 50 })
    .withMessage('Experience must be between 0 and 50 years'),
  
  body('consultationFee')
    .isFloat({ min: 0, max: 10000 })
    .withMessage('Consultation fee must be between 0 and 10000'),
  
  body('education')
    .isArray({ min: 1 })
    .withMessage('At least one education record is required'),
  
  body('education.*.degree')
    .notEmpty()
    .withMessage('Degree is required'),
  
  body('education.*.institution')
    .notEmpty()
    .withMessage('Institution is required'),
  
  body('education.*.graduationYear')
    .isInt({ min: 1950, max: new Date().getFullYear() })
    .withMessage('Invalid graduation year'),
  
  handleValidationErrors
];

// Appointment validation rules
const validateAppointment = [
  body('doctor')
    .custom(isValidObjectId)
    .withMessage('Invalid doctor ID'),
  
  body('service')
    .custom(isValidObjectId)
    .withMessage('Invalid service ID'),
  
  body('appointmentDate')
    .isISO8601()
    .withMessage('Please provide a valid appointment date')
    .custom((value) => {
      const appointmentDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (appointmentDate < today) {
        throw new Error('Appointment date cannot be in the past');
      }
      
      // Check if appointment is not more than 3 months in the future
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      
      if (appointmentDate > maxDate) {
        throw new Error('Appointment date cannot be more than 3 months in the future');
      }
      
      return true;
    }),
  
  body('appointmentTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Please provide a valid time format (HH:MM)'),
  
  body('type')
    .optional()
    .isIn(['consultation', 'follow-up', 'emergency', 'routine-checkup', 'procedure'])
    .withMessage('Invalid appointment type'),
  
  body('notes')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
  
  body('symptoms')
    .optional()
    .isArray()
    .withMessage('Symptoms must be an array'),
  
  handleValidationErrors
];

// Contact form validation rules
const validateContactForm = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ max: 200 })
    .withMessage('Subject cannot exceed 200 characters'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  
  body('service')
    .optional()
    .isIn([
      'General Inquiry', 'Appointment Request', 'Medical Question',
      'Insurance Question', 'Billing Question', 'Feedback',
      'Complaint', 'Other'
    ])
    .withMessage('Invalid service type'),
  
  handleValidationErrors
];

// Service validation rules
const validateService = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Service name is required')
    .isLength({ max: 100 })
    .withMessage('Service name cannot exceed 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Service description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  
  body('category')
    .notEmpty()
    .withMessage('Service category is required')
    .isIn([
      'Cardiology', 'Emergency Medicine', 'General Medicine', 'Pediatrics',
      'Internal Medicine', 'Surgery', 'Diagnostic', 'Preventive Care',
      'Specialized Treatment', 'Rehabilitation', 'Mental Health',
      'Women Health', 'Men Health', 'Senior Care'
    ])
    .withMessage('Invalid service category'),
  
  body('priceRange.min')
    .isFloat({ min: 0 })
    .withMessage('Minimum price cannot be negative'),
  
  body('priceRange.max')
    .isFloat({ min: 0 })
    .withMessage('Maximum price cannot be negative'),
  
  body('duration')
    .isInt({ min: 5, max: 480 })
    .withMessage('Duration must be between 5 and 480 minutes'),
  
  body('features')
    .isArray({ min: 1 })
    .withMessage('At least one feature is required'),
  
  handleValidationErrors
];

// Parameter validation
const validateObjectId = (paramName) => [
  param(paramName)
    .custom(isValidObjectId)
    .withMessage(`Invalid ${paramName} ID`),
  
  handleValidationErrors
];

// Query validation
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  handleValidationErrors
];

const validateDateRange = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date'),
  
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  validateDoctorRegistration,
  validateAppointment,
  validateContactForm,
  validateService,
  validateObjectId,
  validatePagination,
  validateDateRange
};
