const express = require ('express')
require('dotenv').config(); 
const cors = require('cors'); 
const sequelize = require('./config/database');

require('./models/Salle');
require('./models/User');


const authRoutes = require('./routes/authRoutes');
const salleRoutes = require('./routes/salleRoutes');
const adminRoutes = require('./routes/adminRoutes');


const app = express();

app.use(cors());
app.use(express.json());



app.use('/api/auth',authRoutes);
app.use('/api/salles',salleRoutes);
app.use('/api/admin', adminRoutes);


sequelize.authenticate()
  .then(() => {
    console.log('✅ Connecté à MySQL');
    return sequelize.sync(); // crée les tables à partir des modèles
  })
  .then(() => {
    console.log('🧠 Modèles synchronisés avec la base');
    app.listen(5000, () => console.log('🚀 Serveur lancé sur le port 5000'));
  })
  .catch(err => {
    console.error('❌ Erreur de connexion MySQL :', err);
  });
