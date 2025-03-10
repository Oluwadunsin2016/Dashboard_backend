const express = require('express');
const { createInvestment, getInvestments, getInvestmentById } = require('../controllers/investmentController');
const { upload } = require('../upload');

const router = express.Router();


router.post('/create',upload.fields([{ name: 'pictures', maxCount: 5 }, { name: 'videos', maxCount: 3 }]), createInvestment);
router.get('/investments',getInvestments)
router.get('/investments/:id',getInvestmentById)

module.exports = router;