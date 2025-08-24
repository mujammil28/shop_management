const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { sequelize } = require('./models'); // ✅ import models/index.js instead of config/db
const storeRoutes = require('./routes/storeRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const ownerRoutes = require('./routes/ownerRoutes');
const pass = require('./hashPassword');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/owner', ownerRoutes);
app.use('/stores', storeRoutes);

// Test endpoint
app.get('/', (req, res) => res.send('API is running'));

// Sync DB & start server
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }) // ensures tables & associations are applied
  .then(() => {
    app.listen(PORT, () => {
      pass;
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ DB sync error:', err));
