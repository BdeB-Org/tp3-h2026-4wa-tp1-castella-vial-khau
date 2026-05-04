

const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/information_du_maitre_Controllers');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, ctrl.getMaitre);
router.get('/:id', authMiddleware, ctrl.getEtudiantById);
router.put('/:id', authMiddleware, ctrl.updateMaitre);
router.delete('/:id', authMiddleware, ctrl.deleteMaitre);

module.exports = router;
