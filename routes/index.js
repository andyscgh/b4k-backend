const express = require('express');
const router = express.Router();
const db = require('../db');

// Подключение отдельных роутов
router.use('/api/events', require('./events'));

// Пример запроса: получить всех пользователей
router.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

module.exports = router;
