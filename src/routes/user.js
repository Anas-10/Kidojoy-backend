const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Route pour la connexion
router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/update', userController.update);
router.get('/:id', userController.getById);


module.exports = router;
