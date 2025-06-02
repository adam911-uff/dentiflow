const Soin = require('../models/Soin');
const Facture = require('../models/Facture');

exports.ajouterSoin = async (req, res) => {
  try {
    const { rendezVousId, dent, traitement, prix } = req.body;

    // Vérifier si une facture confirmée existe pour ce rendez-vous
    const facture = await Facture.findOne({ where: { rendezVousId, état: 'confirmé' } });
    if (facture) {
      return res.status(403).json({ message: "Impossible d'ajouter un soin. La facture est déjà confirmée." });
    }

    const soin = await Soin.create({ rendezVousId, dent, traitement, prix });
    res.status(201).json(soin);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'ajout du soin", error: err.message });
  }
};

exports.getSoinsByRendezVous = async (req, res) => {
  try {
    const { rendezVousId } = req.params;
    const soins = await Soin.findAll({ where: { rendezVousId } });

    // Calcul du montant total des soins
    const montantTotal = soins.reduce((sum, soin) => sum + soin.prix, 0);

    res.status(200).json({ soins, montantTotal });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des soins", error: err.message });
  }
};

exports.modifierSoin = async (req, res) => {
  try {
    const { id } = req.params;
    const { dent, traitement, prix } = req.body;

    const soin = await Soin.findByPk(id);
    if (!soin) {
      return res.status(404).json({ message: "Soin non trouvé" });
    }

    // Vérifier si la facture liée est confirmée
    const facture = await Facture.findOne({ where: { rendezVousId: soin.rendezVousId, état: 'confirmé' } });
    if (facture) {
      return res.status(403).json({ message: "Modification interdite : la facture est confirmée." });
    }

    await soin.update({ dent, traitement, prix });
    res.status(200).json({ message: "Soin mis à jour avec succès", soin });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification", error: err.message });
  }
};

exports.supprimerSoin = async (req, res) => {
  try {
    const { id } = req.params;

    const soin = await Soin.findByPk(id);
    if (!soin) {
      return res.status(404).json({ message: "Soin non trouvé" });
    }

    // Vérifier si la facture liée est confirmée
    const facture = await Facture.findOne({ where: { rendezVousId: soin.rendezVousId, état: 'confirmé' } });
    if (facture) {
      return res.status(403).json({ message: "Suppression interdite : la facture est confirmée." });
    }

    await soin.destroy();
    res.status(200).json({ message: "Soin supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: err.message });
  }
};
