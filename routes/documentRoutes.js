// routes/documentRoutes.js
const express = require('express');
const router = express.Router();
const documentController = require('../controllers/DocumentController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', upload.single('file'), documentController.ajouterDocument);
router.get('/', documentController.getDocuments);
router.delete('/:id', documentController.supprimerDocument);

module.exports = router;
