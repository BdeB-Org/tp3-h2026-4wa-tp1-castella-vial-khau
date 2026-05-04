const express = require("express");

const router = express.Router();

const activitesController = require("../Controllers/activites_Controllers");

//Route Get
router.get("/Activites", activitesController.getActivites);

router.get("/Activites/:id_activite", activitesController.getActivites);

//Route Post
router.post("/Activites", activitesController.addActivites);

//Route Update
router.put("/Activites/:id_activite", activitesController.updateActivites);

//Route Delete
router.delete("/Activites/:id_activite", activitesController.deleteActivites);

module.exports = router;