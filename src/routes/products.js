const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller.js');
const { verifyToken, isAdmin } = require('../middleware/auth');

// --- CAMBIO IMPORTANTE ---
// Antes: router.get('/', productController.getAllProducts);
// Ahora: Agregamos 'verifyToken' para que solo usuarios logueados vean productos
router.get('/', verifyToken, productController.getAllProducts);
router.get('/:id', verifyToken, productController.getProductById);

// Rutas de ADMIN (requieren verifyToken Y isAdmin)
router.post('/', verifyToken, isAdmin, productController.createProduct);
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;