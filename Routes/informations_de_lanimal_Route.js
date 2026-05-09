//Fait par Brandon Khau TP2   --------
const express = require("express");
const router = express.Router();

const animalControllers = require("../Controllers/informations_de_lanimal_Controllers");

//Route Get
router.get("/Animal", animalControllers.getAnimals);   //--- tous les animaux

router.get("/Animal/:id", animalControllers.getAnimalById);  //--- 1 animal

//Route Post
router.post("/Animal", animalControllers.addAnimal);

//Route Update
router.put("/Animal/:id", animalControllers.updateAnimal);

//Route Delete
router.delete("/Animal/:id", animalControllers.deleteAnimal);

module.exports = router;