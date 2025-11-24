const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', verifyToken, categoryController.getAllCategories);
router.post('/', verifyToken, categoryController.createCategory);

module.exports = router;