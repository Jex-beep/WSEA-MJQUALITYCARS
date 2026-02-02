const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const Admin = mongoose.model('Admin', AdminSchema);

async function createAccount() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const username = 'admin_mj';
  const plainPassword = 'mjqualitycars2026'; // CHANGE THIS TO YOUR CHOICE
  
  // Encrypt the password 10 times (Salt Rounds)
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const admin = new Admin({
    username: username,
    password: hashedPassword
  });

  try {
    await admin.save();
    console.log(`✅ Admin account "${username}" created successfully!`);
  } catch (err) {
    console.log("❌ Error: Account might already exist.");
  }
  process.exit();
}

createAccount();