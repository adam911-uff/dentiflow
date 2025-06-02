const express = require('express');
const router = express.Router();
const factureController = require('../controllers/factureController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', factureController.genererFacture); // Générer
router.post('/confirmer/:id', factureController.confirmerFacture); // Confirmer
router.post('/annuler/:id', factureController.annulerFacture); // Annuler

router.get('/', factureController.getFactures); // Liste
router.get('/:id', factureController.getFactureById); // Détail

module.exports = router;

