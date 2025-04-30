const User =  require ('../models/User');
const bcrypt = require('bcryptjs')

exports.updateUser = async (req,res)=> {
    const {id}= req.params;
    const {etat,email,password,role}= req.body;

    

    try{

        const user = await User.findByPk(id);

        if (!user){
            return res.status(404).json({message:'Utilisateur non trouvé' })
            
        }

        if (email) user.email=email;
        if (password) user.password=await bcrypt.hash(password,10);
        if (etat) user.etat = etat
        if (role) user.role =role;


        await user.save();

        res.status(200).json({message: 'Utilisateur mis à jour avec succès',user});
    
    }catch(error){

        res.status(500).json({message:'Erreur serveur',error:error.message});
    }

};

exports.getAllUsers= async(req,res)=> {
    try{

        const users = await User.findAll ({
            attributes: ['id','email','etat','role','createdAt']
        });

        res.status(200).json(users);
    }catch (error) {
        res.status(500).json({message: 'Erreur serveur',error : error.message});
    }
    
};