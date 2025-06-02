const bcrypt = require ('bcryptjs');
const User = require ('./models/User');



const register = async (email,password,role) => {


    try {
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser){
            throw "Utilisateur existe deja.";
        }


        const hashedPassword = await bcrypt.hash(password,10);


        const newUser = await User.create({
            email,
            password: hashedPassword ,
            role : role || 'utilisateur',
            etat:'active'
        });


      


        console.log({message:"Utilisateur enregistrer avec succes."});

    } catch(err) {
        throw err;new Error("Erreur serveur");
    }
} ;


const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Username?', name => {
  readline.question('Password?', password => {
     register(name, password, "admin")
  });
});