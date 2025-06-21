const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use(routes);

app.get('/ping', (req, res) => {
  res.send('pong');
});

// ✅ Используем PORT из окружения, чтобы Railway знал, какой порт слушать
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
