const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');


router.use(authMiddleware);


router.post('/', patientController.ajouterPatient);


router.get('/', patientController.getPatients);


router.get('/:id', patientController.getPatientById);


router.put('/:id', patientController.modifierPatient);


router.delete('/:id', patientController.supprimerPatient);



module.exports = router;
