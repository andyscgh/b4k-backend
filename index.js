const express = require('express');
const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
