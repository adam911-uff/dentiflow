const express = require('express');
const router = express.Router();
const soinController = require('../controllers/soinController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Ajouter un soin
router.post('/', soinController.ajouterSoin);

// Obtenir tous les soins liés à un rendez-vous (et calcul du montant total)
router.get('/rendezvous/:rendezVousId', soinController.getSoinsByRendezVous);

// Modifier un soin (interdit si facture confirmée)
router.put('/:id', soinController.modifierSoin);

// Supprimer un soin (interdit si facture confirmée)
router.delete('/:id', soinController.supprimerSoin);

module.exports = router;
