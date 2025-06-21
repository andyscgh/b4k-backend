const express = require('express');
const app = express();

// другие настройки

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(3000, () => {
  console.log('Server is running');
});
// Express backend entry with admin features
