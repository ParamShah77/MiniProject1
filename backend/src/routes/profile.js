const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { auth } = require('../middleware/auth');

// Profile management
router.get('/', auth, profileController.getProfile);
router.put('/', auth, profileController.updateProfile);
router.delete('/', auth, profileController.deleteAccount);

// Password management
router.put('/change-password', auth, profileController.changePassword);

// Profile statistics
router.get('/stats', auth, profileController.getProfileStats);

module.exports = router;