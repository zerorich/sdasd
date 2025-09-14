const express = require('express');
const Contact = require('../models/Contact');
const { asyncHandler } = require('../middleware/errorHandler');
// Auth middleware removed - no authentication required
const { validateContactForm, validateObjectId, validatePagination } = require('../middleware/validation');

const router = express.Router();

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    subject,
    message,
    service
  } = req.body;

  // Create contact record
  const contact = await Contact.create({
    firstName,
    lastName,
    phone,
    subject,
    message,
    service,
    metadata: {
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      source: 'website',
      pageUrl: req.get('Referer')
    }
  });


  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully. We will get back to you within 24 hours.',
    contactId: contact._id
  });
});

// @desc    Get all contact submissions
// @route   GET /api/contact
// @access  Public
const getContactSubmissions = asyncHandler(async (req, res) => {
  const { status, priority, page = 1, limit = 10 } = req.query;

  let query = {};
  if (status) query.status = status;
  if (priority) query.priority = priority;

  const contacts = await Contact.find(query)
    .populate('assignedTo', 'firstName lastName phone')
    .populate('response.respondedBy', 'firstName lastName phone')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Contact.countDocuments(query);

  res.json({
    success: true,
    count: contacts.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    contacts
  });
});

// @desc    Get single contact submission
// @route   GET /api/contact/:id
// @access  Public
const getContactSubmission = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id)
    .populate('assignedTo', 'firstName lastName phone')
    .populate('response.respondedBy', 'firstName lastName phone');

  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact submission not found'
    });
  }

  res.json({
    success: true,
    contact
  });
});

// @desc    Update contact status
// @route   PUT /api/contact/:id/status
// @access  Public
const updateContactStatus = asyncHandler(async (req, res) => {
  const { status, priority, assignedTo } = req.body;

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact submission not found'
    });
  }

  const updateData = {};
  if (status) updateData.status = status;
  if (priority) updateData.priority = priority;
  if (assignedTo) updateData.assignedTo = assignedTo;

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true, runValidators: true }
  )
    .populate('assignedTo', 'firstName lastName phone');

  res.json({
    success: true,
    message: 'Contact status updated successfully',
    contact: updatedContact
  });
});

// @desc    Respond to contact
// @route   PUT /api/contact/:id/respond
// @access  Public
const respondToContact = asyncHandler(async (req, res) => {
  const { message, respondedBy } = req.body;

  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return res.status(404).json({
      success: false,
      message: 'Contact submission not found'
    });
  }

  await contact.respond(message, respondedBy);

  // TODO: Send response notification to the contact person

  res.json({
    success: true,
    message: 'Response sent successfully'
  });
});

// @desc    Get contact statistics
// @route   GET /api/contact/statistics
// @access  Public
const getContactStatistics = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;

  const statistics = await Contact.getStatistics(startDate, endDate);

  res.json({
    success: true,
    statistics: statistics[0] || {
      total: 0,
      new: 0,
      inProgress: 0,
      responded: 0,
      closed: 0,
      urgent: 0,
      high: 0,
      medium: 0,
      low: 0
    }
  });
});

// @desc    Get overdue contacts
// @route   GET /api/contact/overdue
// @access  Public
const getOverdueContacts = asyncHandler(async (req, res) => {
  const overdueContacts = await Contact.getOverdue();

  res.json({
    success: true,
    count: overdueContacts.length,
    contacts: overdueContacts
  });
});

// Apply validation middleware to routes
// Public routes (GET only)
router.get('/', validatePagination, getContactSubmissions);
router.get('/statistics', getContactStatistics);
router.get('/overdue', getOverdueContacts);
router.get('/:id', validateObjectId('id'), getContactSubmission);

// All routes are now public (no authentication required)
router.post('/', validateContactForm, submitContactForm);
router.put('/:id/status', validateObjectId('id'), updateContactStatus);
router.put('/:id/respond', validateObjectId('id'), respondToContact);

module.exports = router;
