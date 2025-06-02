
const Patient = require ('../models/Patient');



const ajouterPatient =  async (req ,  res ) => {

    try{
        const {nom,prenom,sexe,age , telephone , email, etat , nb_enfants ,  cnss } = req.body;
        const nouveauPatient = await Patient.create({
            nom,
            prenom,
            sexe,
            age,
            telephone,
            email,
            etat,
            nb_enfants,
            cnss,

        });
        res.status(201).json(nouveauPatient);
    }catch (error){
        res.status(500).json({message:"Erreur lors de l'ajout du patient",error : error.message});
    }
};

const getPatients = async (req, res) => {
    try {
      const patients = await Patient.findAll();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des patients", error: error.message });
    }
  };



const getPatientById = async (req ,res) => {
    try {
        const {id} = req.params;
        const patient = await patient.findBypk;
        if(!patient){
            return res.status(400).json ({message :"Patient non trouvé"});
        }
        res.status(200).json(patient);
    }catch (error){
        res.status(500).json({message: "Erreur lors de la récupération du patient" ,  error:error.message});
    }
};



const modifierPatient = async (req , res)=> {
    try{
        const { id } =req.params;
        const {nom,prenom,sexe,age,telphone,email,etat,nb_enfants,cnss}=req.body;
        const patient = await Patient.findByPk(id);


        if(!patient) {
            return res.status(400).json({ message: "Patient non trouvé"});

        }
        await patient.update({
            nom,
            prenom,
            sexe,
            age,
            telephone,
            email,
            etat,
            nb_enfants,
            cnss,

        });
        res.status(200).json({message:"patient mis a jour avec succès", patient});

    }catch (error){
        res.status(500).json({message :"Erreur lors de la modification du patient",error:error.message});
    }
};


const supprimerPatient = async (req, res) => {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);
  
      if (!patient) {
        return res.status(404).json({ message: "Patient non trouvé" });
      }
  
      await patient.destroy();
      res.status(200).json({ message: "Patient supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression du patient", error: error.message });
    }
  };

  module.exports = {
    ajouterPatient,
    getPatients ,
    getPatientById,
    modifierPatient,
    supprimerPatient

  };

