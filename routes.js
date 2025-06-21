const express = require('express');
const router = express.Router();
const db = require('./db');

// Получить пользователя по Telegram ID
router.get('/users/:telegram_id', async (req, res) => {
  const { telegram_id } = req.params;

  try {
    const user = await db.get(
      'SELECT * FROM users WHERE telegram_id = ?',
      telegram_id
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Ошибка при получении пользователя:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
// Routes including PATCH /api/employee/:id/make-admin
