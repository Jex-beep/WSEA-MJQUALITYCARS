const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

// --- 1. THE CRITICAL FIX: INCREASE PAYLOAD LIMITS ---
app.use(cors());
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MJ Quality Cars Database: ONLINE"))
  .catch(err => console.log("❌ Connection Error: ", err));

// --- SCHEMAS ---

// Product Schema
const CarSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  type: String,
  price: String, 
  image: String, 
  gallery: [String], 
  isAvailable: { type: Boolean, default: true },
  description: String,
  gearbox: String,
  fuel: String,
  engine: String,
  ac: String,
  seats: Number,
  distance: String,
  equipment: [String]
});
const Car = mongoose.model('Car', CarSchema);

// NEW: Blog Schema (Mirrors Car structure for maximum compatibility)
const BlogSchema = new mongoose.Schema({
  title: String,
  category: { type: String, default: 'Guides' },
  date: String,
  author: { type: String, default: 'M&J Admin' },
  authorImage: String,
  readTime: String,
  image: String, 
  description: String,
  content: String
}, { collection: 'blogs' }); // Explicitly names the "folder" in MongoDB
const Blog = mongoose.model('Blog', BlogSchema);

// Admin Schema
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const Admin = mongoose.model('Admin', AdminSchema);



// --- API ROUTES: CARS (Products) ---

app.post('/api/cars', async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(500).json({ message: "Error adding car", error });
  }
});

app.patch('/api/cars/:id', async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(updatedCar);
  } catch (error) {
    res.status(500).json({ message: "Error updating car", error });
  }
});

app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cars" });
  }
});

app.get('/api/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    res.json(car);
  } catch (err) {
    res.status(404).json({ message: "Car not found" });
  }
});

app.delete('/api/cars/:id', async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// --- API ROUTES: BLOGS (Articles) ---

// Add Blog (Mirrors addCar)
app.post('/api/blogs', async (req, res) => {
  try {
    console.log("📥 Receiving Blog Data...");
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    console.log("✅ Blog Created in MongoDB");
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Blog Save Error:", error);
    res.status(500).json({ message: "Error adding blog", error });
  }
});

// Update Blog (Mirrors updateCar)
app.patch('/api/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
});

// Get All Blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // Newest first
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// Get Single Blog
app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog details" });
  }
});

// Delete Blog
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Article removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// --- AUTH ROUTES ---

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login Successful", user: admin.username });
  } catch (error) {
    res.status(500).json({ message: "Server error during login" });
  }
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));