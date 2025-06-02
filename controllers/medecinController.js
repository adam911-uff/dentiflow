const Medecin = require('../models/Medecin');
const Salle =require ('../models/Salle');



const ajouterMedecin=  async(req,res) =>{

    try {
        const { nom, prenom, email, specialite, age, sexe, salaire, telephone, salleId} = req.body;


        const salle =await Salle.findByPk(salleId);
        if(!salle){
            return res.status(400).json({ message: "Salle non trouvée"});
        }

        const nouveauMedecin = await Medecin.create({
            nom,
            prenom,
            email,
            specialite,
            age,
            sexe,
            salaire,
            telephone,
            salleId
          });
          res.status(201).json(nouveauMedecin);

        }catch(error){
            res.status(500).json({message: "Erreur lors de l'ajout du médecin", error: error.message});
        }


};

const getMedecins = async (req,res)=> {

    try {
        const Medecins = await Medecin.findAll({
            include : { 
                model : Salle,
                as :'salle',
                attributes :['id','nom','type','etat']
            }
        });
        res.status(200).json(medecins);
    }catch(error){
        res.status(500).json({message: "Erreur lors de la récupération des médecins", error: error.message});
    }
};


const getMedecinbyId = async ( req,res ) => {
    try{
        const { id } = req.params;
        const medecin = await Medecin.findByPk(id ,{
            include: {
                model : Salle ,
                as :'salle' ,
                attributes:['id', 'nom', 'type', 'etat']
            }
        });
        if (!medecin) {
            return res.status(404).json({ message: "Médecin non trouvé" }); 
        }

        res.status(200).json(medecin);
    }catch(error){
        res.status(500).json({ message: "Erreur lors de la récupération du médecin", error: error.message });
  
    }
};


const modifierMedecin = async (req,res) =>{
    try{
        const {id} =req.params;
        const{ nom, prenom, email, specialite, age, sexe, salaire, telephone, salleId}=req.body;


        const medecin = await medecin.findByPk(id);
        if (!medecin){
            return res.status(404).json({ message: "Médecin non trouvé" }); 
        }

        if (salleId) {
            const salle = await Salle.findByPk(salleId);
            if (!salle) {
              return res.status(404).json({ message: "Salle non trouvée" });
            }
    }

    await medecin.update({
        nom,
        prenom,
        email,
        specialite,
        age,
        sexe,
        salaire,
        telephone,
        salleId
      });
      res.status(200).json({ message: "Médecin mis à jour avec succès", medecin });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la modification du médecin", error: error.message });
    }
};


const supprimerMedecin = async (req, res) => {
    try {
      const { id } = req.params;
      const medecin = await Medecin.findByPk(id);
  
      if (!medecin) {
        return res.status(404).json({ message: "Médecin non trouvé" });
      }
  
      await medecin.destroy();
      res.status(200).json({ message: "Médecin supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression du médecin", error: error.message });
    }
  };
  module.exports = {
    ajouterMedecin,
    getMedecins,
    getMedecinbyId,
    modifierMedecin,
    supprimerMedecin
};
