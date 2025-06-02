const { Op, fn, col, literal, Sequelize } = require('sequelize');
const User = require('../models/User');
const Medecin = require('../models/Medecin');
const Patient = require('../models/Patient');
const Facture = require('../models/Facture');

exports.getDashboardStats = async (req, res) => {
  try {
    // 1. Médecins et infirmiers par sexe
    const medecinsParSexe = await Medecin.findAll({
      attributes: ['sexe', [fn('COUNT', col('id')), 'total']],
      group: ['sexe']
    });

    const infirmiersParSexe = await User.findAll({
      where: { role: 'infirmiere' },
      attributes: ['sexe', [fn('COUNT', col('id')), 'total']],
      group: ['sexe']
    });

    // 2. Nombre de patients par médecin
    const patientsParMedecin = await Patient.findAll({
      attributes: [
        'medecinId',
        [fn('COUNT', col('id')), 'totalPatients']
      ],
      group: ['medecinId']
    });

    // 3. Nombre de patients par sexe
    const patientsParSexe = await Patient.findAll({
      attributes: ['sexe', [fn('COUNT', col('id')), 'total']],
      group: ['sexe']
    });

    // 4. Factures payées et non payées
    const factures = await Facture.findAll({
      attributes: [
        'etat',
        [fn('COUNT', col('id')), 'total']
      ],
      group: ['etat']
    });

    // 5. Chiffre d'affaires mensuel et annuel
    const maintenant = new Date();
    const debutAnnee = new Date(maintenant.getFullYear(), 0, 1);
    const debutMois = new Date(maintenant.getFullYear(), maintenant.getMonth(), 1);

    const chiffreAnnuel = await Facture.sum('montant_totale', {
      where: {
        etat: 'confirmé',
        date: { [Op.gte]: debutAnnee }
      }
    });

    const chiffreMensuel = await Facture.sum('montant_totale', {
      where: {
        etat: 'confirmé',
        date: { [Op.gte]: debutMois }
      }
    });

    // 6. TVA trimestrielle (20%)
    const troisMoisAvant = new Date();
    troisMoisAvant.setMonth(troisMoisAvant.getMonth() - 3);

    const totalTrimestre = await Facture.sum('montant_totale', {
      where: {
        etat: 'confirmé',
        date: { [Op.gte]: troisMoisAvant }
      }
    });

    const tvaTrimestrielle = totalTrimestre * 0.2;

    // Résultat final
    res.status(200).json({
      medecinsParSexe,
      infirmiersParSexe,
      patientsParMedecin,
      patientsParSexe,
      factures,
      chiffreAnnuel,
      chiffreMensuel,
      tvaTrimestrielle
    });

  } catch (err) {
    res.status(500).json({ message: 'Erreur dans le tableau de bord', error: err.message });
  }
};
