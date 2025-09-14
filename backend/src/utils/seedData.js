const mongoose = require('mongoose');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Service = require('../models/Service');
const Appointment = require('../models/Appointment');

// Load environment variables
require('dotenv').config();

const seedData = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://zerorich207_db_user:5mitttJWSEPH00Dg@cluster0.1hu4eyl.mongodb.net/';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Create admin user
    const adminUser = await User.findOneAndUpdate(
      { phone: '+1-555-000-0000' },
      {
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1-555-000-0000',
        password: 'admin123',
        role: 'admin',
        isActive: true
      },
      { upsert: true, new: true }
    );
    console.log('✅ Admin user created:', adminUser.phone);

    // Create sample doctors
    const doctor1 = await User.findOneAndUpdate(
      { phone: '+1-555-123-4567' },
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        phone: '+1-555-123-4567',
        password: 'password123',
        role: 'doctor',
        isActive: true
      },
      { upsert: true, new: true }
    );

    const doctor2 = await User.findOneAndUpdate(
      { phone: '+1-555-123-4568' },
      {
        firstName: 'Michael',
        lastName: 'Chen',
        phone: '+1-555-123-4568',
        password: 'password123',
        role: 'doctor',
        isActive: true
      },
      { upsert: true, new: true }
    );

    const doctor3 = await User.findOneAndUpdate(
      { phone: '+1-555-123-4569' },
      {
        firstName: 'Emily',
        lastName: 'Rodriguez',
        phone: '+1-555-123-4569',
        password: 'password123',
        role: 'doctor',
        isActive: true
      },
      { upsert: true, new: true }
    );

    console.log('✅ Doctor users created');

    // Create doctor profiles
    await Doctor.findOneAndUpdate(
      { user: doctor1._id },
      {
        user: doctor1._id,
        specialty: 'Cardiology',
        licenseNumber: 'MD123456',
        experience: 15,
        education: [
          {
            degree: 'MD',
            institution: 'Harvard Medical School',
            graduationYear: 2008,
            country: 'US'
          }
        ],
        consultationFee: 200,
        rating: { average: 4.9, count: 125 },
        bio: 'Specialized in interventional cardiology and heart disease prevention with over 15 years of experience.',
        isActive: true,
        isVerified: true,
        department: 'Cardiology',
        officeLocation: {
          building: 'Main Building',
          floor: '2nd Floor',
          room: '201'
        },
        availability: {
          monday: { start: '09:00', end: '17:00', isAvailable: true },
          tuesday: { start: '09:00', end: '17:00', isAvailable: true },
          wednesday: { start: '09:00', end: '17:00', isAvailable: true },
          thursday: { start: '09:00', end: '17:00', isAvailable: true },
          friday: { start: '09:00', end: '17:00', isAvailable: true },
          saturday: { start: '09:00', end: '13:00', isAvailable: true },
          sunday: { start: '', end: '', isAvailable: false }
        }
      },
      { upsert: true, new: true }
    );

    await Doctor.findOneAndUpdate(
      { user: doctor2._id },
      {
        user: doctor2._id,
        specialty: 'Pediatrics',
        licenseNumber: 'MD123457',
        experience: 12,
        education: [
          {
            degree: 'MD',
            institution: 'Johns Hopkins University',
            graduationYear: 2011,
            country: 'US'
          }
        ],
        consultationFee: 150,
        rating: { average: 4.8, count: 98 },
        bio: 'Expert in child healthcare and developmental medicine with a focus on preventive care.',
        isActive: true,
        isVerified: true,
        department: 'Pediatrics',
        officeLocation: {
          building: 'Pediatrics Wing',
          floor: '1st Floor',
          room: '101'
        },
        availability: {
          monday: { start: '08:00', end: '18:00', isAvailable: true },
          tuesday: { start: '08:00', end: '18:00', isAvailable: true },
          wednesday: { start: '08:00', end: '18:00', isAvailable: true },
          thursday: { start: '08:00', end: '18:00', isAvailable: true },
          friday: { start: '08:00', end: '18:00', isAvailable: true },
          saturday: { start: '09:00', end: '15:00', isAvailable: true },
          sunday: { start: '', end: '', isAvailable: false }
        }
      },
      { upsert: true, new: true }
    );

    await Doctor.findOneAndUpdate(
      { user: doctor3._id },
      {
        user: doctor3._id,
        specialty: 'Emergency Medicine',
        licenseNumber: 'MD123458',
        experience: 10,
        education: [
          {
            degree: 'MD',
            institution: 'Mayo Clinic College',
            graduationYear: 2013,
            country: 'US'
          }
        ],
        consultationFee: 300,
        rating: { average: 4.9, count: 156 },
        bio: 'Leading emergency care physician with trauma expertise and rapid response capabilities.',
        isActive: true,
        isVerified: true,
        department: 'Emergency Medicine',
        officeLocation: {
          building: 'Emergency Department',
          floor: 'Ground Floor',
          room: 'ER-01'
        },
        emergencyContact: {
          available: true,
          phone: '+1-555-911-0000'
        }
      },
      { upsert: true, new: true }
    );

    console.log('✅ Doctor profiles created');

    // Create sample services
    const services = [
      {
        name: 'Cardiology Consultation',
        description: 'Comprehensive heart care with advanced cardiac treatments and interventions.',
        category: 'Cardiology',
        priceRange: { min: 150, max: 300 },
        duration: 45,
        features: ['ECG & Echo', 'Heart Surgery', 'Preventive Care'],
        isActive: true,
        isPopular: true,
        icon: 'heart',
        tags: ['cardiology', 'heart', 'cardiovascular'],
        availability: {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
          saturday: true, sunday: false
        }
      },
      {
        name: 'Emergency Medicine',
        description: '24/7 emergency care with rapid response and critical care services.',
        category: 'Emergency Medicine',
        priceRange: { min: 200, max: 500 },
        duration: 30,
        features: ['Trauma Care', 'ICU Services', 'Ambulance'],
        isActive: true,
        isPopular: true,
        icon: 'activity',
        tags: ['emergency', 'trauma', 'critical-care'],
        availability: {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
          saturday: true, sunday: true
        }
      },
      {
        name: 'General Medicine',
        description: 'Complete primary healthcare services for patients of all ages.',
        category: 'General Medicine',
        priceRange: { min: 100, max: 200 },
        duration: 30,
        features: ['Health Checkups', 'Vaccinations', 'Chronic Care'],
        isActive: true,
        isPopular: true,
        icon: 'user-check',
        tags: ['general', 'primary-care', 'checkup'],
        availability: {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
          saturday: true, sunday: false
        }
      },
      {
        name: 'Pediatric Care',
        description: 'Specialized medical care for infants, children, and adolescents.',
        category: 'Pediatrics',
        priceRange: { min: 120, max: 250 },
        duration: 40,
        features: ['Child Development', 'Immunizations', 'Pediatric Surgery'],
        isActive: true,
        isPopular: true,
        icon: 'users',
        tags: ['pediatrics', 'children', 'childcare'],
        availability: {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
          saturday: true, sunday: false
        }
      },
      {
        name: 'Internal Medicine',
        description: 'Comprehensive care for complex medical conditions in adults.',
        category: 'Internal Medicine',
        priceRange: { min: 130, max: 280 },
        duration: 45,
        features: ['Diabetes Care', 'Hypertension', 'Preventive Medicine'],
        isActive: true,
        isPopular: false,
        icon: 'stethoscope',
        tags: ['internal-medicine', 'adult-care', 'chronic-conditions'],
        availability: {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
          saturday: false, sunday: false
        }
      },
      {
        name: 'Surgical Services',
        description: 'Advanced surgical procedures with minimally invasive techniques.',
        category: 'Surgery',
        priceRange: { min: 500, max: 2000 },
        duration: 120,
        features: ['Laparoscopic', 'Orthopedic', 'General Surgery'],
        isActive: true,
        isPopular: false,
        icon: 'ambulance',
        tags: ['surgery', 'surgical', 'procedures'],
        availability: {
          monday: true, tuesday: true, wednesday: true, thursday: true, friday: true,
          saturday: false, sunday: false
        }
      }
    ];

    for (const serviceData of services) {
      await Service.findOneAndUpdate(
        { name: serviceData.name },
        serviceData,
        { upsert: true, new: true }
      );
    }

    console.log('✅ Services created');

    // Create sample appointments
    const appointmentData = [
      {
        patient: {
          firstName: 'John',
          lastName: 'Doe',
          phone: '+1-555-0101',
          dateOfBirth: new Date('1985-05-15'),
          gender: 'male'
        },
        doctor: doctor1._id,
        service: (await Service.findOne({ name: 'General Consultation' }))._id,
        appointmentDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        appointmentTime: '10:00',
        status: 'scheduled',
        reason: 'Regular checkup',
        notes: 'Patient requested morning appointment'
      },
      {
        patient: {
          firstName: 'Jane',
          lastName: 'Smith',
          phone: '+1-555-0102',
          dateOfBirth: new Date('1990-08-22'),
          gender: 'female'
        },
        doctor: doctor2._id,
        service: (await Service.findOne({ name: 'Cardiology Consultation' }))._id,
        appointmentDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        appointmentTime: '14:30',
        status: 'scheduled',
        reason: 'Heart palpitations',
        notes: 'Follow-up appointment'
      },
      {
        patient: {
          firstName: 'Mike',
          lastName: 'Johnson',
          phone: '+1-555-0103',
          dateOfBirth: new Date('1978-12-10'),
          gender: 'male'
        },
        doctor: doctor3._id,
        service: (await Service.findOne({ name: 'Emergency Consultation' }))._id,
        appointmentDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        appointmentTime: '09:00',
        status: 'scheduled',
        reason: 'Chest pain',
        notes: 'Urgent consultation needed'
      }
    ];

    for (const appointment of appointmentData) {
      await Appointment.findOneAndUpdate(
        { 
          'patient.phone': appointment.patient.phone,
          appointmentDate: appointment.appointmentDate
        },
        appointment,
        { upsert: true, new: true }
      );
    }

    console.log('✅ Appointments created');

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📋 Created:');
    console.log('- 1 Admin user (+1-555-000-0000)');
    console.log('- 3 Doctor users and profiles');
    console.log('- 6 Medical services');
    console.log('- 3 Sample appointments');
    console.log('\n🔐 Default passwords:');
    console.log('- Admin: admin123');
    console.log('- Doctors: password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData()
    .then(() => {
      console.log('✅ Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

module.exports = seedData;
