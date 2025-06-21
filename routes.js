const express = require('express');
const router = express.Router();
const db = require('./db');

// Получить всех сотрудников
router.get('/users', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Получить сотрудника по username
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const result = await db.query('SELECT * FROM employees WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Обновить статус сотрудника
router.post('/user/:username/status', async (req, res) => {
  const { username } = req.params;
  const { status } = req.body;
  try {
    await db.query('UPDATE employees SET status = $1 WHERE username = $2', [status, username]);
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
