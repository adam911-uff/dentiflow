const Facture = require('../models/Facture');
const RendezVous = require('../models/RendezVous');
const Paiement = require('../models/Paiement');

// Stockage temporaire du compteur (devrait venir de config en DB)
let compteur = 1000;
const prefixe = "FAC"; // à rendre dynamique si besoin

exports.genererFacture = async (req, res) => {
  try {
    const { rendezVousId, montant_totale, date } = req.body;

    const nouvelleFacture = await Facture.create({
      reference: `TEMP-${Date.now()}`, // temporaire avant confirmation
      montant_totale,
      date,
      rendezVousId
    });

    res.status(201).json(nouvelleFacture);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la génération", error: err.message });
  }
};

exports.confirmerFacture = async (req, res) => {
  try {
    const { id } = req.params;

    const facture = await Facture.findByPk(id);
    if (!facture) {
      return res.status(404).json({ message: "Facture non trouvée" });
    }

    if (facture.état === 'confirmé') {
      return res.status(400).json({ message: "Déjà confirmée" });
    }

    // Générer la référence finale
    const referenceFinale = `${prefixe}-${compteur}`;
    compteur++;

    facture.reference = referenceFinale;
    facture.état = 'confirmé';
    await facture.save();

    res.status(200).json(facture);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la confirmation", error: err.message });
  }
};

exports.annulerFacture = async (req, res) => {
  try {
    const { id } = req.params;

    const facture = await Facture.findByPk(id);
    if (!facture) {
      return res.status(404).json({ message: "Facture non trouvée" });
    }

    facture.état = 'annulé';
    await facture.save();

    res.status(200).json({ message: "Facture annulée avec succès", facture });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l’annulation", error: err.message });
  }
};

exports.getFactures = async (req, res) => {
  try {
    const factures = await Facture.findAll({ include: ['rendezvous'] });
    res.status(200).json(factures);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
};

exports.getFactureById = async (req, res) => {
  try {
    const facture = await Facture.findByPk(req.params.id, { include: ['rendezvous'] });
    if (!facture) {
      return res.status(404).json({ message: "Facture non trouvée" });
    }
    res.status(200).json(facture);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

exports.getMontantRestant = async (req, res) => {
  try {
    const { factureId } = req.params;

    const facture = await Facture.findByPk(factureId);
    if (!facture) return res.status(404).json({ message: "Facture non trouvée" });

    const totalPaye = await Paiement.sum('montant', {
      where: { factureId }
    });

    const restant = facture.montant_totale - (totalPaye || 0);

    res.status(200).json({ montant_rest: restant });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
