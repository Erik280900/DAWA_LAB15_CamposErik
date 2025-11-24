const express = require('express');
const cors = require('cors');

// Importar rutas
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');           // Nuevo: Debes crear este archivo
const categoriesRouter = require('./routes/categories'); // Nuevo: Debes crear este archivo

const app = express();

// Configuración de CORS (Punto 4 del requerimiento)
const corsOptions = {
    origin: [
        'http://localhost:3000',      // Tu frontend local
        'https://tu-proyecto.vercel.app', // Tu frontend en producción (Cámbialo cuando despliegues)
        'https://frontend-marketplace.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Definición de endpoints
app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);           // Rutas de Login/Registro
app.use('/api/categories', categoriesRouter); // Rutas de Categorías

app.get('/', (req, res) => {
    res.json({ message: 'API E-commerce funcionando 🚀' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;