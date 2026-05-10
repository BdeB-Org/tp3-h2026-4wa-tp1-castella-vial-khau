//Fait par Brandon Khau TP2   --------  Sandra pour le TP3
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const animalControllers = require("../Controllers/informations_de_lanimal_Controllers");

//Route Get
router.get("/Animal",authMiddleware,  animalControllers.getAnimals)   //--- tous les animaux

router.get("/Animal/:id", authMiddleware,  animalControllers.getAnimalById);  //--- 1 animal

//Route Post
router.post("/Animal", authMiddleware,  animalControllers.addAnimal);

//Route Update
router.put("/Animal/:id", authMiddleware, animalControllers.updateAnimal);

//Route Delete
router.delete("/Animal/:id", authMiddleware,  animalControllers.deleteAnimal);

module.exports = router;