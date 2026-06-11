require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // This ensures the password gets properly hashed!

async function seedAdmin() {
  try {
    // Connect directly to your live Atlas database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Check if admin already exists just in case
    const existingAdmin = await User.findOne({ email: 'admin@launchlog.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists!');
      process.exit(0);
    }

    // Create the new admin
    const admin = new User({
      name: 'Admin User',
      email: 'admin@launchlog.com',
      password: 'admin123456', // The User model will automatically encrypt this!
      rfid: 'BBAD9002',
      role: 'admin'
    });

    await admin.save();
    console.log('🎉 Admin user successfully created in the cloud!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

seedAdmin();