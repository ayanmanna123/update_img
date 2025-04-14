const express = require('express');
const multer = require('multer');
const Student = require('../models/student');

const router = express.Router();

// Store file in memory instead of saving to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, class: studentClass, age } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Photo is required' });
    }

    const newStudent = new Student({
      name,
      class: studentClass,
      age,
      photo: {
        data: req.file.buffer.toString('base64'), // convert buffer to base64
        contentType: req.file.mimetype
      }
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student created', student: newStudent });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
