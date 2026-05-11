const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/informations_du_maitre_Controllers');
const authMiddleware = require('../middleware/authMiddleware');

// Route GET
router.get('/Maitre', authMiddleware, ctrl.getMaitre);
router.get('/Maitre/:id', authMiddleware, ctrl.getMaitreById);

// Route POST
router.post("/Maitre", authMiddleware,  ctrl.addMaitre);

// Route UPDATE
router.put('/Maitre/:id', authMiddleware, ctrl.updateMaitre);

// Route DELETE
router.delete('/Maitre/:id', authMiddleware, ctrl.deleteMaitre);

module.exports = router;
