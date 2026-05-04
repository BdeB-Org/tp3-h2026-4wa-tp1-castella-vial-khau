const express = require("express");

const router = express.Router();

const avisController = require("../Controllers/avis_Controllers");

//Route Get
router.get("/Avis", avisController.getAvis);

router.get("/Avis/:idAvis", avisController.getAvis);

//Route Post
router.post("/Avis", avisController.addAvis);

//Route Update
router.put("/Avis/:idAvis", avisController.updateAvis);

//Route Delete
router.delete("/Avis/:idAvis", avisController.deleteAvis);

module.exports = router;