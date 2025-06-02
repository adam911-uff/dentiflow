const express = require('express');
const router = express.Router();
const medecinController = require('../controllers/medecinController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);

router.post('/', medecinController.ajouterMedecin);


router.get('/', medecinController.getMedecins);

router.get('/:id', medecinController.getMedecinbyId);

router.put('/:id', medecinController.modifierMedecin);

router.delete('/:id', medecinController.supprimerMedecin);


module.exports = router;