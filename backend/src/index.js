const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ ok: true, service: 'backend' });
});

app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ ok: false, message: 'Route not found.' });
});

app.listen(port, () => {
  console.log(`Auth project running on http://localhost:${port}`);
});
