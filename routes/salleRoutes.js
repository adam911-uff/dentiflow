const express = require('express');
const router= express.Router();

const salleController = require('../controllers/salleController');
const authMiddleware = require('../middleware/authMiddleware');



router.use(authMiddleware);



router.post('/',salleController.ajouterSalle);

router.get('/',salleController.getSalles);

router.get('/:id',salleController.getSalleById);

router.put('/:id', salleController.modifierSalle);

router.delete('/:id',salleController. supprimerSalle);

module.exports = router;
