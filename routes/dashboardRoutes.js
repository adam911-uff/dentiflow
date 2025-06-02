const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');
const isAdminMiddleware = require('../middleware/isAdminMiddleware');

// Seul l'admin peut accéder
router.get('/', authMiddleware, isAdminMiddleware, dashboardController.getDashboardStats);

module.exports = router;
