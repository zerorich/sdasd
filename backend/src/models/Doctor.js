const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialty: {
    type: String,
    required: [true, 'Specialty is required'],
    enum: [
      'Cardiology',
      'Emergency Medicine',
      'General Medicine',
      'Pediatrics',
      'Internal Medicine',
      'Surgery',
      'Orthopedics',
      'Dermatology',
      'Neurology',
      'Oncology',
      'Psychiatry',
      'Radiology',
      'Anesthesiology',
      'Pathology',
      'Ophthalmology'
    ]
  },
  licenseNumber: {
    type: String,
    required: [true, 'License number is required'],
    unique: true
  },
  education: [{
    degree: {
      type: String,
      required: true
    },
    institution: {
      type: String,
      required: true
    },
    graduationYear: {
      type: Number,
      required: true
    },
    country: {
      type: String,
      default: 'US'
    }
  }],
  experience: {
    type: Number,
    required: [true, 'Experience in years is required'],
    min: [0, 'Experience cannot be negative']
  },
  certifications: [{
    name: String,
    issuingOrganization: String,
    issueDate: Date,
    expiryDate: Date
  }],
  languages: [{
    type: String,
    enum: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Russian']
  }],
  availability: {
    monday: {
      start: String,
      end: String,
      isAvailable: { type: Boolean, default: true }
    },
    tuesday: {
      start: String,
      end: String,
      isAvailable: { type: Boolean, default: true }
    },
    wednesday: {
      start: String,
      end: String,
      isAvailable: { type: Boolean, default: true }
    },
    thursday: {
      start: String,
      end: String,
      isAvailable: { type: Boolean, default: true }
    },
    friday: {
      start: String,
      end: String,
      isAvailable: { type: Boolean, default: true }
    },
    saturday: {
      start: String,
      end: String,
      isAvailable: { type: Boolean, default: false }
    },
    sunday: {
      start: String,
      end: String,
      isAvailable: { type: Boolean, default: false }
    }
  },
  consultationFee: {
    type: Number,
    required: [true, 'Consultation fee is required'],
    min: [0, 'Fee cannot be negative']
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  profileImage: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  department: {
    type: String,
    required: true
  },
  officeLocation: {
    building: String,
    floor: String,
    room: String
  },
  emergencyContact: {
    available: {
      type: Boolean,
      default: false
    },
    phone: String
  }
}, {
  timestamps: true
});

// Index for better query performance
doctorSchema.index({ specialty: 1 });
doctorSchema.index({ 'rating.average': -1 });
doctorSchema.index({ isActive: 1, isVerified: 1 });

// Virtual for full name (populated from User)
doctorSchema.virtual('fullName', {
  ref: 'User',
  localField: 'user',
  foreignField: '_id',
  justOne: true
});

// Method to update rating
doctorSchema.methods.updateRating = function(newRating) {
  const totalRating = (this.rating.average * this.rating.count) + newRating;
  this.rating.count += 1;
  this.rating.average = totalRating / this.rating.count;
  return this.save();
};

// Static method to get doctors by specialty
doctorSchema.statics.getBySpecialty = function(specialty) {
  return this.find({ specialty, isActive: true, isVerified: true })
    .populate('user', 'firstName lastName phone avatar')
    .sort({ 'rating.average': -1 });
};

// Static method to get top rated doctors
doctorSchema.statics.getTopRated = function(limit = 10) {
  return this.find({ isActive: true, isVerified: true })
    .populate('user', 'firstName lastName phone avatar')
    .sort({ 'rating.average': -1, 'rating.count': -1 })
    .limit(limit);
};

module.exports = mongoose.model('Doctor', doctorSchema);
