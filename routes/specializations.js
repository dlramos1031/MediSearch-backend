const express = require('express');
const {
  getAllSpecializations,
  addSpecialization,
} = require('../controllers/specializationsController');

const router = express.Router();

router.get('/', getAllSpecializations); // Fetch all specializations
router.post('/', addSpecialization); // Add a new specialization

module.exports = router;
