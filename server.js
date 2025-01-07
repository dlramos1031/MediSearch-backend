const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const hospitalRoutes = require('./routes/hospitals');
const specializationRoutes = require('./routes/specializations');
const reviewRoutes = require('./routes/reviews');

// Register Routes
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/specializations', specializationRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
