const Salle = require('../models/Salle');

const ajouterSalle = async (req ,res) =>{

    const{ nom, type, etat } =req.body;
    try{
        const nouvelleSalle = await Salle.create({nom,type, etat} );
        
        res.status(201).json(nouvelleSalle);
    }catch (err){
        res.status(500).json({message:'Errur lors de la creation ' , error :err});
    }
};


const getSalles = async (req, res) => {
    try {
      const salles = await Salle.findAll();
      res.status(200).json(salles);
    } catch (err) {
      console.error('❌ Erreur Sequelize (getSalles):', err); // <-- ajoute ça
      res.status(500).json({ message: 'Erreur lors de la récupération', error: err.message });
    }
};
  
  
  
const  getSalleById = async (req, res) => {
    try {
      const { id } = req.params;
      const salle = await Salle.findByPk(id);
      
      if (!salle) {
        return res.status(404).json({ message: "Salle non trouvée" });
      }
  
      res.status(200).json(salle);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération de la salle", error: error.message });
    }
  };



  
  
const modifierSalle = async (req , res) => {
    const { id } = req.params;
    const{ nom,type,etat} =req.body;
    try{
        const [updated] = await Salle.update({nom , type, etat} ,{where:{id}});
        if (updated===0) {

            return res.status(404).json({ message: 'Salle non trouvée' });
        }

        
       const salleModifiee = await Salle.findByPk(id);

    
       
        res.status(200).json(salleModifiee);
    }catch(err){
        res.status(500).json({ message: 'Erreur lors de la modification', error : err});
    }
};



const supprimerSalle = async (req, res)=> {

    const { id } = req.params;
    try{
        const deleted= await Salle.destroy({where:{id}});
        if(!deleted){
            return res.status(404).json({ message: 'Salle non trouvée' });
        }
        res.status(200).json({message:'Salle supprimée avec succès'});
    } catch (err){

        res.status(500).json({ message: 'Erreur lors de la suppression', error: err });
    }
};
module.exports = {
    ajouterSalle,
    getSalles,
    getSalleById, 
    modifierSalle,
    supprimerSalle
};
