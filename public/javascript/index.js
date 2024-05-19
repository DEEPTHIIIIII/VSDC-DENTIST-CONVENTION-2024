const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config(); // Ensure this line is at the top to load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
console.log(process.env.MONGO_URI);

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in the .env file');
  process.exit(1);
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema
const studentSchema = new mongoose.Schema({
  name: String,
  collegeName: String,
  email: String,
  phone: String,
  pursuing: String,
  studentType: String,
  poster: String // URL to the uploaded file if any
});

const Student = mongoose.model('Student', studentSchema);

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({ storage });

// Route to handle form submission
app.post('/register', upload.single('poster'), async (req, res) => {
  const { name, collegeName, email, phone, pursuing, studentType } = req.body;
  const poster = req.file ? req.file.path : '';

  try {
    const newStudent = new Student({
      name,
      collegeName,
      email,
      phone,
      pursuing,
      studentType,
      poster
    });

    await newStudent.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
