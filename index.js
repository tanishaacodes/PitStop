const express = require('express');
const cors = require('cors');
require('dotenv').config();

const washroomsRoute = require('./routes/washrooms');
const usersRoute = require('./routes/users');
const ratingsRoute = require('./routes/ratings');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/washrooms', washroomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/ratings', ratingsRoute);

app.get('/', (req, res) => {
  res.send('PitStop API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});