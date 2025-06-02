const RendezVous = require ('../models/RendezVous');
const Patient = require ('../models/Patient');
const Salle = require ('../models/Salle');
const Medecin = require('../models/Medecin');


exports.ajouterRendezVous = async (req, res) => {


    const { date, etat, motif, patientId, salleId, medecinId} = req.body;
    try{
        const nouveauRdv = await RendezVous.create({ date, etat, motif, patientId, salleId,medecinId});
        res.status(201).json(nouveauRdv);
    } catch (err){
        res.status(500).json({message: "Erreur lors de l'ajout du rendez-vous", error: err.message})
    }
};


exports.getRendezVous = async (req,res) => {


    try {
        const rdvs =await RendezVous.findAll({
            include :[
                {model:Patient,as:'patient'},
                {model:Salle ,as:'salle'},
                {model: Medecin ,as:'medecin'}
            ]
        });
        res.status(200).json(rdvs);

    }catch(err){
        res.status(500).json({message:"Erreur lors de la recuperation",error:err.message});
    }
};


exports.getRendezVousById = async (req, res) => {
    try {
      const { id } = req.params;
      const rdv = await RendezVous.findByPk(id, {
        include: [
          { model: Patient, as: 'patient' },
          { model: Salle, as: 'salle' },
          {model: Medecin ,as:'medecin'}
            ]

        
      });
      if (!rdv) {
        return res.status(404).json({ message: "Rendez-vous non trouvé" });
      }
      res.status(200).json(rdv);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération du rendez-vous", error: error.message });
    }
  };
  


exports.modifierRendezVous = async (req,res) =>{
  
    try{
        
        const {id } =req.params;
        const{date, etat, motif, patientId, salleId,medecinId} = req.body;
        const rdv = await RendezVous.findByPk(id);


        if (!rdv){

            return res.status(404).json({message: "Rendez-vous non trouvé"});
        }

        await rdv.update({date, etat, motif, patientId, salleId,medecinId});
        res.status(200).json({ message: "Rendez-vous mis à jour avec succès", rdv });
    }catch(error){
        res.status(500).json({message: "Erreur lors de la modification du rendez-vous", error: error.message});
    }

};


exports.supprimerRendezVous = async (req ,res) => {
    try {
      const { id } = req.params;
      const rdv = await RendezVous.findByPk(id);
  
      if (!rdv) {
        return res.status(404).json({ message: "Rendez-vous non trouvé" });
      }
  
      await rdv.destroy();
      res.status(200).json({ message: "Rendez-vous supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression du rendez-vous", error: error.message });
    }
  };

   