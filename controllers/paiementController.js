const Paiement = require('../models/Paiement');
const Facture = require('../models/Facture');

exports.ajouterPaiement = async (req, res) => {
  try {
    const { montant, mode, factureId } = req.body;

    const facture = await Facture.findByPk(factureId, {
      include: ['paiements']
    });
    if (!facture) return res.status(404).json({ message: "Facture non trouvée" });

    const totalPayé = facture.paiements.reduce((acc, p) => acc + p.montant, 0);
    const restant = facture.montant_totale - totalPayé;

    if (montant > restant) {
      return res.status(400).json({ message: "Montant supérieur au restant dû" });
    }

    const paiement = await Paiement.create({ montant, mode, factureId });
    res.status(201).json({ message: "Paiement enregistré", paiement });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du paiement", error: err.message });
  }
};

exports.getPaiementsByFacture = async (req, res) => {
  try {
    const { factureId } = req.params;
    const paiements = await Paiement.findAll({ where: { factureId } });
    res.status(200).json(paiements);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
