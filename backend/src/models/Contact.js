const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  phone: {
    type: String,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  service: {
    type: String,
    enum: [
      'General Inquiry',
      'Appointment Request',
      'Medical Question',
      'Insurance Question',
      'Billing Question',
      'Feedback',
      'Complaint',
      'Other'
    ],
    default: 'General Inquiry'
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'responded', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  response: {
    message: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  },
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  tags: [{
    type: String,
    lowercase: true
  }],
  metadata: {
    ipAddress: String,
    userAgent: String,
    source: {
      type: String,
      enum: ['website', 'phone', 'social-media'],
      default: 'website'
    },
    pageUrl: String
  },
  attachments: [{
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    url: String
  }]
}, {
  timestamps: true
});

// Index for better query performance
contactSchema.index({ status: 1 });
contactSchema.index({ priority: 1 });
contactSchema.index({ createdAt: -1 });

// Virtual for full name
contactSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for formatted phone number
contactSchema.virtual('formattedPhone').get(function() {
  if (!this.phone) return null;
  
  // Format US phone numbers
  const cleaned = this.phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return this.phone;
});

// Virtual for checking if response is overdue
contactSchema.virtual('isOverdue').get(function() {
  if (this.status === 'responded' || this.status === 'closed') return false;
  
  const hoursSinceCreated = (new Date() - this.createdAt) / (1000 * 60 * 60);
  
  switch (this.priority) {
    case 'urgent':
      return hoursSinceCreated > 2; // 2 hours
    case 'high':
      return hoursSinceCreated > 24; // 24 hours
    case 'medium':
      return hoursSinceCreated > 48; // 48 hours
    case 'low':
      return hoursSinceCreated > 168; // 7 days
    default:
      return false;
  }
});

// Static method to get contacts by status
contactSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to get contacts by priority
contactSchema.statics.getByPriority = function(priority) {
  return this.find({ priority }).sort({ createdAt: -1 });
};

// Static method to get overdue contacts
contactSchema.statics.getOverdue = function() {
  const now = new Date();
  const urgentCutoff = new Date(now - 2 * 60 * 60 * 1000); // 2 hours ago
  const highCutoff = new Date(now - 24 * 60 * 60 * 1000); // 24 hours ago
  const mediumCutoff = new Date(now - 48 * 60 * 60 * 1000); // 48 hours ago
  const lowCutoff = new Date(now - 7 * 24 * 60 * 60 * 1000); // 7 days ago
  
  return this.find({
    status: { $in: ['new', 'in-progress'] },
    $or: [
      { priority: 'urgent', createdAt: { $lt: urgentCutoff } },
      { priority: 'high', createdAt: { $lt: highCutoff } },
      { priority: 'medium', createdAt: { $lt: mediumCutoff } },
      { priority: 'low', createdAt: { $lt: lowCutoff } }
    ]
  }).sort({ priority: 1, createdAt: 1 });
};

// Static method to get contact statistics
contactSchema.statics.getStatistics = function(startDate, endDate) {
  const matchStage = {};
  
  if (startDate && endDate) {
    matchStage.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
  
  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        new: {
          $sum: { $cond: [{ $eq: ['$status', 'new'] }, 1, 0] }
        },
        inProgress: {
          $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
        },
        responded: {
          $sum: { $cond: [{ $eq: ['$status', 'responded'] }, 1, 0] }
        },
        closed: {
          $sum: { $cond: [{ $eq: ['$status', 'closed'] }, 1, 0] }
        },
        urgent: {
          $sum: { $cond: [{ $eq: ['$priority', 'urgent'] }, 1, 0] }
        },
        high: {
          $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] }
        },
        medium: {
          $sum: { $cond: [{ $eq: ['$priority', 'medium'] }, 1, 0] }
        },
        low: {
          $sum: { $cond: [{ $eq: ['$priority', 'low'] }, 1, 0] }
        }
      }
    }
  ]);
};

// Instance method to respond to contact
contactSchema.methods.respond = function(message, respondedBy) {
  this.status = 'responded';
  this.response = {
    message,
    respondedBy,
    respondedAt: new Date()
  };
  return this.save();
};

// Instance method to assign to user
contactSchema.methods.assignTo = function(userId) {
  this.assignedTo = userId;
  this.status = 'in-progress';
  return this.save();
};

module.exports = mongoose.model('Contact', contactSchema);
