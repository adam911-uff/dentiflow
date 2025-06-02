const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const User = require ('../models/User');


const register = async (req , res) => {


    const{email,password,role} = req.body;



    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser){
             return res.status(400).json({message: "Utilisateur existe deja."});
        }


        const hashedPassword = await bcrypt.hash(password,10);


        const newUser = await User.create({
            email,
            password: hashedPassword ,
            role : 'utilisateur',
            etat:'active'
        
        
        });


      


        res.status(201).json({message:"Utilisateur enregistrer avec succes."});

    } catch(err) {
        res.status(500).json({message : "Erreur serveur" , error:err });

    }
} ;
 
const login = async (req,res) => {

    const { email , password ,} = req.body;
    try{
        const user = await User.findOne({ where: { email } });

        if (!user) 
            return res.status(404).json({message :"Utilisateur non trouver"});


        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch)
            
             return res.status(400).json({message:"Mot de passe incorrect."});

        const token = jwt.sign({id: user.id,role: user.role},process.env.JWT_SECRET,{ expiresIn : '1d'});

        res.status(200).json({token});


        }catch(err){

            res.status(500).json({message:"Erreur serveur",error: err});
        }

};

module.exports = { register, login };


