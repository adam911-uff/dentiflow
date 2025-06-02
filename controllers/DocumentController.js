// controllers/documentController.js
const Document = require('../models/Document');

exports.ajouterDocument = async (req, res) => {
  try {
    const { nom, type } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Fichier manquant' });
    }

    const nouveauDoc = await Document.create({
      nom,
      type,
      nature: file.mimetype.split('/')[1],
      path: file.path
    });

    res.status(201).json(nouveauDoc);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du document", error: error.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.findAll();
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
  }
};

exports.supprimerDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Document.findByPk(id);
    if (!doc) {
      return res.status(404).json({ message: "Document non trouvé" });
    }

    await doc.destroy();
    res.status(200).json({ message: "Document supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
  }
};
