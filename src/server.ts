import express from 'express';
import librosRouter from './routes/libros';
import prestamosRouter, { prestarLibro, devolverLibro } from './routes/prestamos';
import estadisticasRouter from './routes/estadisticas';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Registrar rutas
app.use('/libros', librosRouter);
app.use('/prestamos', prestamosRouter);
app.use('/estadisticas', estadisticasRouter);

// Endpoints especiales anidados en /libros/:id/prestar y /devolver
app.post('/libros/:id/prestar', prestarLibro);
app.post('/libros/:id/devolver', devolverLibro);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});