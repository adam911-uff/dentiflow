const express = require('express');
const router = express.Router();
const paiementController = require('../controllers/paiementController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', paiementController.ajouterPaiement);
router.get('/', paiementController.getPaiementsByFacture);

module.exports = router;
