const express = require("express");

const router = express.Router();

const infoMaitreController = require("../Controllers/information_du_maitre_Controllers");

//Route Get
router.get("/Information_du_maitre", infoMaitreController.getMaitre);

router.get("/Information_du_maitre/:id", infoMaitreController.getMaitre);

//Route Post
router.post("/Information_du_maitre", infoMaitreController.addMaitre);

router.post("/Information_du_maitre/:id", infoMaitreController.addMaitre);

//Route Update
router.put("/Information_du_maitre/:id", infoMaitreController.updateMaitre);

//Route Delete
router.delete("/Information_du_maitre/:id", infoMaitreController.deleteMaitre);

module.exports = router;