const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient is required']
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor is required']
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'Service is required']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format']
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  type: {
    type: String,
    enum: ['consultation', 'follow-up', 'emergency', 'routine-checkup', 'procedure'],
    default: 'consultation'
  },
  duration: {
    type: Number, // in minutes
    default: 30
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  symptoms: [{
    type: String
  }],
  diagnosis: {
    type: String,
    maxlength: [500, 'Diagnosis cannot exceed 500 characters']
  },
  prescription: [{
    medication: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: {
    type: Date
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'partial', 'refunded'],
    default: 'pending'
  },
  amount: {
    type: Number,
    min: [0, 'Amount cannot be negative']
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'insurance', 'online']
  },
  insuranceInfo: {
    provider: String,
    policyNumber: String,
    groupNumber: String,
    coveragePercentage: Number
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderDate: {
    type: Date
  },
  cancellationReason: {
    type: String,
    maxlength: [200, 'Cancellation reason cannot exceed 200 characters']
  },
  cancelledBy: {
    type: String,
    enum: ['patient', 'doctor', 'admin', 'system']
  },
  cancelledAt: {
    type: Date
  },
  rescheduledFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  metadata: {
    bookingSource: {
      type: String,
      enum: ['website', 'phone', 'admin', 'mobile-app'],
      default: 'website'
    },
    ipAddress: String,
    userAgent: String
  }
}, {
  timestamps: true
});

// Index for better query performance
appointmentSchema.index({ patient: 1, appointmentDate: 1 });
appointmentSchema.index({ doctor: 1, appointmentDate: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1 });

// Virtual for full appointment datetime
appointmentSchema.virtual('appointmentDateTime').get(function() {
  const date = new Date(this.appointmentDate);
  const [hours, minutes] = this.appointmentTime.split(':');
  date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return date;
});

// Virtual for formatted appointment date
appointmentSchema.virtual('formattedDate').get(function() {
  return this.appointmentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Virtual for checking if appointment is in the past
appointmentSchema.virtual('isPast').get(function() {
  return this.appointmentDateTime < new Date();
});

// Virtual for checking if appointment can be cancelled
appointmentSchema.virtual('canBeCancelled').get(function() {
  const hoursUntilAppointment = (this.appointmentDateTime - new Date()) / (1000 * 60 * 60);
  return hoursUntilAppointment > 24 && ['scheduled', 'confirmed'].includes(this.status);
});

// Pre-save middleware to validate appointment time
appointmentSchema.pre('save', function(next) {
  if (this.appointmentDateTime <= new Date()) {
    return next(new Error('Appointment date and time must be in the future'));
  }
  next();
});

// Static method to get appointments by date range
appointmentSchema.statics.getByDateRange = function(startDate, endDate, doctorId = null) {
  const query = {
    appointmentDate: {
      $gte: startDate,
      $lte: endDate
    }
  };
  
  if (doctorId) {
    query.doctor = doctorId;
  }
  
  return this.find(query)
    .populate('patient', 'firstName lastName phone')
    .populate('doctor', 'specialty')
    .populate('service', 'name duration')
    .sort({ appointmentDate: 1, appointmentTime: 1 });
};

// Static method to check availability
appointmentSchema.statics.checkAvailability = function(doctorId, date, time) {
  return this.findOne({
    doctor: doctorId,
    appointmentDate: date,
    appointmentTime: time,
    status: { $in: ['scheduled', 'confirmed'] }
  });
};

// Static method to get upcoming appointments
appointmentSchema.statics.getUpcoming = function(patientId, limit = 10) {
  return this.find({
    patient: patientId,
    appointmentDateTime: { $gte: new Date() },
    status: { $in: ['scheduled', 'confirmed'] }
  })
    .populate('doctor', 'specialty')
    .populate('service', 'name duration')
    .sort({ appointmentDate: 1, appointmentTime: 1 })
    .limit(limit);
};

// Instance method to cancel appointment
appointmentSchema.methods.cancel = function(reason, cancelledBy) {
  this.status = 'cancelled';
  this.cancellationReason = reason;
  this.cancelledBy = cancelledBy;
  this.cancelledAt = new Date();
  return this.save();
};

// Instance method to reschedule appointment
appointmentSchema.methods.reschedule = function(newDate, newTime) {
  this.appointmentDate = newDate;
  this.appointmentTime = newTime;
  this.status = 'scheduled';
  return this.save();
};

module.exports = mongoose.model('Appointment', appointmentSchema);
