const express = require('express');
const router= express.Router();

const{

    ajouterSalle,
  getSalles,
  modifierSalle,
  supprimerSalle    
} = require('../controllers/salleController');
const authMiddleware = require('../middleware/authMiddleware');
router.use(authMiddleware);

router.post('/',ajouterSalle);

router.get('/',getSalles);

router.put('/:id', modifierSalle);

router.delete('/:id', supprimerSalle);

module.exports = router;
