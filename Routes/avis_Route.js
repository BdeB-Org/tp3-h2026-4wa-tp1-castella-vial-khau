//Fait par Brandon Khau
const express = require("express");

const router = express.Router();

const avisController = require("../Controllers/avis_Controllers");

//Route Get
router.get("/Avis", avisController.getAvis);

router.get("/Avis/:id", avisController.getAvis);

//Route Post
router.post("/Avis", avisController.addAvis);

//Route Update
router.put("/Avis/:id", avisController.updateAvis);

//Route Delete
router.delete("/Avis/:id", avisController.deleteAvis);

module.exports = router;