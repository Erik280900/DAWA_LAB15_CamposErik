const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al obtener categorías' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { nombre } = req.body;
    const category = await Category.create({ nombre });
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al crear categoría' });
  }
};