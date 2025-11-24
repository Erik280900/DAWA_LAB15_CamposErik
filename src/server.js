const app = require('./app');
const sequelize = require('./config/database');
require('dotenv').config();

// IMPORTANTE: Importar modelos para que Sequelize sepa que existen y crear relaciones
const Product = require('./models/Product');
const Category = require('./models/Category'); // Nuevo
const User = require('./models/User');         // Nuevo

// Definir Relaciones (Asociaciones)
Category.hasMany(Product);
Product.belongsTo(Category);

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida.');

        // 'alter: true' actualizará las tablas añadiendo las columnas nuevas (CategoryId, imageUrl, etc.)
        await sequelize.sync({ alter: true });
        console.log('Modelos y relaciones sincronizados.');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();