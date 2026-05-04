const express = require("express");

const router = express.Router();

//---Sandra Castella--routes des infos médicales
const infosMedicalesControllers = require("../Controllers/informations_medicales_Controllers");

//----route GET lire un élément----
router.get("/informationsMedicales", infosMedicalesControllers.getInfosMedicales);  //---- 1id= nom de la route----2id+ nom de la const----requête

//----route POST----ajouter un élément
router.post("/informationsMedicales/:id", infosMedicalesControllers.addInfosMedicales);

//----route PUT----modifier un élément
router.put("/informationsMedicales/:id", infosMedicalesControllers.updateInfosMedicales);

//----route Delete----supprimer un élément
router.delete("/informationsMedicales/:id", infosMedicalesControllers.deleteInfosMedicales);


module.exports = router;