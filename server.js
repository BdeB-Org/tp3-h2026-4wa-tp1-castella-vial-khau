const express = require("express");

const app = express();

app.use(express.json());

// Pour Activités
const activitesRoutes = require("./Routes/activites_Route");

app.use("/", activitesRoutes);

app.get ("/", (req,res)=> {
    res.send("Bienvenue sur l'API des activites !");
});

// Pour Avis
const avisRoutes = require("./Routes/avis_Route");

app.use("/", avisRoutes);

app.get ("/", (req,res)=> {
    res.send("Bienvenue sur l'API du refuge !");
});

// Pour Information du maître
const infosMaitreRoutes = require("./Routes/information_du_maitre_Route");

app.use("/", infosMaitreRoutes);

// Pour Animal
const animalRoutes = require("./Routes/informations_de_lanimal_Route");

app.use("/", animalRoutes);

app.get("/", (req,res)=> {
    res.send("Bienvenu sur l'API des informations de l'animal !");
})

//----Pour table infos médicales--------------------------------------------------------------------------
const infosMedicalesRoutes = require("./Routes/informations_medicales_Route");

app.use("/", infosMedicalesRoutes);



//----Pour table infos cliniques---------------------------------------------------------------------
const infosCliniqueRoutes = require("./Routes/informations_clinique_Route");

app.use("/", infosCliniqueRoutes);


//-----doit rester à la fin
app.listen(3000, ()=> {
    console.log("Serveur lancé sur le port 3000");
});