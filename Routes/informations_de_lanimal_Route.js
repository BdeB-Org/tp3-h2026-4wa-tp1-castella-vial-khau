//Fait par Brandon Khau
const express = require("express");

const router = express.Router();

const animalControllers = require("../Controllers/informations_de_lanimal_Controllers");

//Route Get
router.get("/Animal", animalControllers.getAnimal);

router.get("/Animal/:id", animalControllers.getAnimal);

//Route Post
router.post("/Animal", animalControllers.addAnimal);

//Route Update
router.put("/Animal/:id", animalControllers.updateAnimal);

//Route Delete
router.delete("/Animal/:id", animalControllers.deleteAnimal);

module.exports = router;