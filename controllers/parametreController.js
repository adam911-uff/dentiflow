// controllers/parametreController.js
const TypeSalle = require('../models/TypeSalle');
const TypeDocument = require('../models/TypeDocument');
const Specialite = require('../models/Specialite');
const ReferenceDent = require('../models/ReferenceDent');

const createOne = (Model) => async (req, res) => {
  try {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Erreur création', error: err.message });
  }
};

const getAll = (Model) => async (req, res) => {
  try {
    const items = await Model.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: 'Erreur récupération', error: err.message });
  }
};

const supprimer = (Model) => async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Model.findByPk(id);
    if (!item) return res.status(404).json({ message: 'Non trouvé' });
    await item.destroy();
    res.status(200).json({ message: 'Supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur suppression', error: err.message });
  }
};

module.exports = {
  createTypeSalle: createOne(TypeSalle),
  getTypeSalles: getAll(TypeSalle),
  deleteTypeSalle: supprimer(TypeSalle),

  createTypeDocument: createOne(TypeDocument),
  getTypeDocuments: getAll(TypeDocument),
  deleteTypeDocument: supprimer(TypeDocument),

  createSpecialite: createOne(Specialite),
  getSpecialites: getAll(Specialite),
  deleteSpecialite: supprimer(Specialite),

  createReferenceDent: createOne(ReferenceDent),
  getReferencesDent: getAll(ReferenceDent),
  deleteReferenceDent: supprimer(ReferenceDent),
};
