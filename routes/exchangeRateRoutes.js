const express = require('express');
const { setRate, getRate } = require('../controllers/exchangeRateController');

const router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
  
// Create or update exchange rate
router.post('/set-rate', setRate);

// Get exchange rate
router.get('/get-rate', getRate);

module.exports = router;