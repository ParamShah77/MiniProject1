const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');
const { auth } = require('../middleware/auth');

// Protected routes (require authentication)
router.post('/message', auth, chatbotController.sendMessage);

// Public routes
router.get('/suggestions', chatbotController.getSuggestions);

module.exports = router;
