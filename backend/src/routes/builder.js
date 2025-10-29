const express = require('express');
const router = express.Router();
const builderController = require('../controllers/builderController');
const { auth } = require('../middleware/auth');

router.post('/save', auth, builderController.saveBuiltResume);
router.get('/resume', auth, builderController.getBuiltResume);
router.get('/export', auth, builderController.exportResumePDF);

module.exports = router;
