const express = require('express');
const router = express.Router();
const { getRecommendation } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// All AI routes are protected
router.use(protect);

// POST /api/ai/recommend
router.post('/recommend', getRecommendation);

module.exports = router;
