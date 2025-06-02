// routes/parametreRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/parametreController');
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');

router.use(auth, isAdmin);

// Type de salle
router.post('/type-salle', controller.createTypeSalle);
router.get('/type-salle', controller.getTypeSalles);
router.delete('/type-salle/:id', controller.deleteTypeSalle);

// Type de document
router.post('/type-document', controller.createTypeDocument);
router.get('/type-document', controller.getTypeDocuments);
router.delete('/type-document/:id', controller.deleteTypeDocument);

// Spécialité
router.post('/specialite', controller.createSpecialite);
router.get('/specialite', controller.getSpecialites);
router.delete('/specialite/:id', controller.deleteSpecialite);

// Référence dent
router.post('/reference-dent', controller.createReferenceDent);
router.get('/reference-dent', controller.getReferencesDent);
router.delete('/reference-dent/:id', controller.deleteReferenceDent);

module.exports = router;
