const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/api/events', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM events ORDER BY date');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB error');
  }
});

module.exports = router;
