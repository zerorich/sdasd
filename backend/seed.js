require('dotenv').config();
const connectDB = require('./src/config/database');
const seedData = require('./src/utils/seedData');

const runSeed = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Run seeding
    await seedData();
    
    console.log('\n✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

runSeed();
