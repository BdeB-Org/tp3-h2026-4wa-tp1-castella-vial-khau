//Fait par Brandon Khau
const express = require("express");

const router = express.Router();

const avisController = require("../Controllers/avis_Controllers");

const authMiddleware = require('../middleware/authMiddleware');

//Route Get
router.get("/", authMiddleware, avisController.getAvis);

router.get("/:idAvis",authMiddleware, avisController.getAvisByID);

//Route Post
router.post("/", authMiddleware, avisController.addAvis);

//Route Update
router.put("/:idAvis", authMiddleware, avisController.updateAvis);

//Route Delete
router.delete("/:idAvis", authMiddleware, avisController.deleteAvis);

module.exports = router;