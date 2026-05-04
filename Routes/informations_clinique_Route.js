const express = require("express");

const router = express.Router();

//---Sandra Castella--routes des infos clinique
const infosCliniqueControllers = require("../Controllers/informations_clinique_Controllers");

//----route GET lire un élément----
router.get("/Informations_clinique", infosCliniqueControllers.getInformationsClinique);

//----route POST----ajouter un élément
router.post("/Informations_clinique/:id", infosCliniqueControllers.addInformationsClinique);

//----route PUT----modifier un élément
router.put("/Informations_clinique/:id", infosCliniqueControllers.updateInformationsClinique);

//----route Delete----supprimer un élément
router.delete("/Informations_clinique/:id", infosCliniqueControllers.deleteInformationsClinique);


module.exports = router;