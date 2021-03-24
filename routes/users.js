var express = require('express');
var router = express.Router();
var usersController = require('../controllers/users');

// Get users
router.get('/:id', usersController.get);

// Post users
router.post('/', usersController.post);



module.exports = router;
