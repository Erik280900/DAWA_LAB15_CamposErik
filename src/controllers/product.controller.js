const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener productos' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    res.json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener producto' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // --- CAMBIO AQUÍ: Agregamos imageUrl y CategoryId ---
    const { nombre, precio, descripcion, imageUrl, CategoryId } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({ success: false, message: 'Nombre y precio son requeridos' });
    }

    const product = await Product.create({ 
      nombre, 
      precio, 
      descripcion, 
      imageUrl,      // Guardar imagen
      CategoryId     // Guardar categoría
    });

    res.status(201).json({ success: true, message: 'Producto creado', data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al crear producto' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    // --- CAMBIO AQUÍ: Agregamos imageUrl y CategoryId ---
    const { nombre, precio, descripcion, imageUrl, CategoryId } = req.body;
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    }

    await product.update({ 
      nombre, 
      precio, 
      descripcion, 
      imageUrl,      // Actualizar imagen
      CategoryId     // Actualizar categoría
    });

    res.json({ success: true, message: 'Producto actualizado', data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al actualizar producto' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Producto no encontrado' });
    await product.destroy();
    res.json({ success: true, message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al eliminar producto' });
  }
};