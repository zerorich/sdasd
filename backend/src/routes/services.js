const express = require('express');
const Service = require('../models/Service');
const { asyncHandler } = require('../middleware/errorHandler');
// Auth middleware removed - no authentication required
const { validateObjectId, validatePagination } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all services
// @route   GET /api/services
// @access  Public
const getServices = asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 10, sort = 'name' } = req.query;

  let query = { isActive: true };
  if (category) {
    query.category = category;
  }

  const services = await Service.find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Service.countDocuments(query);

  res.json({
    success: true,
    count: services.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    services
  });
});

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)
    .populate('doctors', 'specialty');

  if (!service || !service.isActive) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }

  res.json({
    success: true,
    service
  });
});

// @desc    Get services by category
// @route   GET /api/services/category/:category
// @access  Public
const getServicesByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const services = await Service.getByCategory(category)
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Service.countDocuments({ category, isActive: true });

  res.json({
    success: true,
    count: services.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    category,
    services
  });
});

// @desc    Get popular services
// @route   GET /api/services/popular
// @access  Public
const getPopularServices = asyncHandler(async (req, res) => {
  const { limit = 6 } = req.query;

  const services = await Service.getPopular(parseInt(limit));

  res.json({
    success: true,
    count: services.length,
    services
  });
});

// @desc    Search services
// @route   GET /api/services/search
// @access  Public
const searchServices = asyncHandler(async (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;

  if (!q || q.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Search query must be at least 2 characters long'
    });
  }

  const services = await Service.search(q.trim())
    .limit(limit * 1)
    .skip((page - 1) * limit);

  const total = await Service.countDocuments({
    $and: [
      { isActive: true },
      {
        $or: [
          { name: { $regex: q.trim(), $options: 'i' } },
          { description: { $regex: q.trim(), $options: 'i' } },
          { tags: { $in: [new RegExp(q.trim(), 'i')] } }
        ]
      }
    ]
  });

  res.json({
    success: true,
    count: services.length,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    query: q.trim(),
    services
  });
});

// @desc    Create service
// @route   POST /api/services
// @access  Public
const createService = asyncHandler(async (req, res) => {
  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Service created successfully',
    service
  });
});

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Public
const updateService = asyncHandler(async (req, res) => {
  let service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }

  service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.json({
    success: true,
    message: 'Service updated successfully',
    service
  });
});

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Public
const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }

  await Service.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Service deleted successfully'
  });
});

// @desc    Get service categories
// @route   GET /api/services/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Service.distinct('category', { isActive: true });

  res.json({
    success: true,
    categories
  });
});

// Apply validation middleware
// Public routes (GET only)
router.get('/', validatePagination, getServices);
router.get('/popular', getPopularServices);
router.get('/categories', getCategories);
router.get('/search', validatePagination, searchServices);
router.get('/category/:category', validatePagination, getServicesByCategory);
router.get('/:id', validateObjectId('id'), getService);

// All routes are now public (no authentication required)
router.post('/', createService);
router.put('/:id', validateObjectId('id'), updateService);
router.delete('/:id', validateObjectId('id'), deleteService);

module.exports = router;
