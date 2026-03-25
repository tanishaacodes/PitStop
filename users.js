const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST register new user
router.post('/register', (req, res) => {
  const { name, email, phone, city } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });

  const query = 'INSERT INTO Users (name, email, phone, city) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, phone, city], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User registered successfully!', user_id: results.insertId });
  });
});

// GET single user by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM Users WHERE user_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(results[0]);
  });
});

module.exports = router;