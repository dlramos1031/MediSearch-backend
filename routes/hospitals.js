const express = require('express');
const { getAllHospitals, getHospitalById, getHospitalsBySpecialization, searchHospitalsByName, getHospitalsByProximity } = require('../controllers/hospitalsController.js');
const router = express.Router();

router.get('/', getAllHospitals);
router.get('/:id', getHospitalById); 
router.get('/specialization/:id', getHospitalsBySpecialization);
router.get('/search', searchHospitalsByName);
router.get('/proximity', getHospitalsByProximity);

module.exports = router;
