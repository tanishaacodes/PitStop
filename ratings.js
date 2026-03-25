const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all ratings for a washroom
router.get('/washroom/:id', (req, res) => {
  db.query('SELECT * FROM Ratings WHERE washroom_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST submit a new rating
router.post('/', (req, res) => {
  const { user_id, washroom_id, cleanliness, safety, amenities, review_text, photo_url } = req.body;

  if (!user_id || !washroom_id || !cleanliness || !safety || !amenities) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `INSERT INTO Ratings 
    (user_id, washroom_id, cleanliness, safety, amenities, review_text, photo_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(query, [user_id, washroom_id, cleanliness, safety, amenities, review_text, photo_url], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Rating submitted successfully!', rating_id: results.insertId });
  });
});

module.exports = router;