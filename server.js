const express = require('express');
const path = require('path');
const app = express();

// Initialise la BD
require('./Config/database');

app.use(express.json());
app.use(express.static('public'));

//----- routes auth
const authRoutes = require('./Routes/authRoutes');
app.use('/api/auth', authRoutes);

//-----connexion route informations de l'animal ---- Sandra
const maitreRoutes = require("./Routes/informations_du_maitre_Route");
app.use("/api", maitreRoutes);

//-----connexion route informations de l'animal ---- Sandra
const animalRoutes = require("./Routes/informations_de_lanimal_Route");
app.use("/api", animalRoutes);

//----------------------------------------------

const avisRoutes = require("./Routes/avis_Route")
app.use("/api/avis", avisRoutes)

// Redirection par défaut
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
