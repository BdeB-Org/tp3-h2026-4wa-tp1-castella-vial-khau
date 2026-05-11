const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/informations_du_maitre_Controllers');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/Maitre', authMiddleware, ctrl.getMaitre);
router.get('/Maitre/:id', authMiddleware, ctrl.getMaitreById);

router.put('/Maitre/:id', authMiddleware, ctrl.updateMaitre);

router.delete('/Maitre/:id', authMiddleware, ctrl.deleteMaitre);

module.exports = router;
