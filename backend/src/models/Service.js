const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Service name is required'],
    trim: true,
    unique: true,
    maxlength: [100, 'Service name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Service description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Service category is required'],
    enum: [
      'Cardiology',
      'Emergency Medicine',
      'General Medicine',
      'Pediatrics',
      'Internal Medicine',
      'Surgery',
      'Diagnostic',
      'Preventive Care',
      'Specialized Treatment',
      'Rehabilitation',
      'Mental Health',
      'Women Health',
      'Men Health',
      'Senior Care'
    ]
  },
  priceRange: {
    min: {
      type: Number,
      required: [true, 'Minimum price is required'],
      min: [0, 'Price cannot be negative']
    },
    max: {
      type: Number,
      required: [true, 'Maximum price is required'],
      min: [0, 'Price cannot be negative']
    }
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Service duration is required'],
    min: [5, 'Duration must be at least 5 minutes']
  },
  features: [{
    type: String,
    required: true
  }],
  requirements: [{
    type: String
  }],
  preparationInstructions: {
    type: String,
    maxlength: [500, 'Preparation instructions cannot exceed 500 characters']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String, // Icon name or URL
    default: 'stethoscope'
  },
  image: {
    type: String // Service image URL
  },
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
  availability: {
    monday: { type: Boolean, default: true },
    tuesday: { type: Boolean, default: true },
    wednesday: { type: Boolean, default: true },
    thursday: { type: Boolean, default: true },
    friday: { type: Boolean, default: true },
    saturday: { type: Boolean, default: false },
    sunday: { type: Boolean, default: false }
  },
  bookingWindow: {
    advanceBookingDays: {
      type: Number,
      default: 30,
      min: 1,
      max: 365
    },
    cancellationHours: {
      type: Number,
      default: 24,
      min: 1,
      max: 168
    }
  },
  insuranceAccepted: [{
    type: String
  }],
  ageRestrictions: {
    minAge: {
      type: Number,
      min: 0
    },
    maxAge: {
      type: Number,
      max: 150
    }
  },
  genderRestrictions: {
    type: String,
    enum: ['male', 'female', 'all'],
    default: 'all'
  },
  tags: [{
    type: String,
    lowercase: true
  }],
  metadata: {
    seoTitle: String,
    seoDescription: String,
    keywords: [String]
  }
}, {
  timestamps: true
});

// Index for better query performance
serviceSchema.index({ name: 1 });
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1, isPopular: 1 });
serviceSchema.index({ tags: 1 });

// Virtual for formatted price range
serviceSchema.virtual('formattedPriceRange').get(function() {
  return `$${this.priceRange.min} - $${this.priceRange.max}`;
});

// Virtual for formatted duration
serviceSchema.virtual('formattedDuration').get(function() {
  if (this.duration < 60) {
    return `${this.duration} minutes`;
  } else {
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hours`;
  }
});

// Static method to get services by category
serviceSchema.statics.getByCategory = function(category) {
  return this.find({ category, isActive: true }).sort({ isPopular: -1, name: 1 });
};

// Static method to get popular services
serviceSchema.statics.getPopular = function(limit = 6) {
  return this.find({ isActive: true, isPopular: true })
    .sort({ name: 1 })
    .limit(limit);
};

// Static method to search services
serviceSchema.statics.search = function(query) {
  return this.find({
    $and: [
      { isActive: true },
      {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { tags: { $in: [new RegExp(query, 'i')] } }
        ]
      }
    ]
  }).sort({ isPopular: -1, name: 1 });
};

module.exports = mongoose.model('Service', serviceSchema);
