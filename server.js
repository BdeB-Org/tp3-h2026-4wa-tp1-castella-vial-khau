const express = require("express");

const app = express();

// Pour Avis
const avisRoutes = require("./Routes/avis_Route");

app.use("/", avisRoutes);

app.get ("/", (req,res)=> {
    res.send("Bienvenu sur l'API de la refuge !");
});

// Pour Animal
const animalRoutes = require("./Routes/informations_de_lanimal_Route");

app.use("/", animalRoutes);

app.get("/", (req,res)=> {
    res.send("Bienvenu sur l'API des informations de l'animal !");
})

app.listen(3000, ()=> {
    console.log("Serveur lancé sur le port 3000");
});