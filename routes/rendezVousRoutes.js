const express = require ('express');
const router = express.Router();
const rendezVousController = require('../controllers/rendezVousController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);


router.post('/', rendezVousController.ajouterRendezVous);



router.get('/', rendezVousController.getRendezVous);

router.get('/:id', rendezVousController.getRendezVousById);


router.put('/:id', rendezVousController.modifierRendezVous);


router.delete('/:id', rendezVousController.supprimerRendezVous);


module.exports = router;