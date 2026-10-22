"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devolverLibro = exports.prestarLibro = void 0;
const express_1 = require("express");
const data_1 = require("../data");
const router = (0, express_1.Router)();
// GET /prestamos
router.get('/', (req, res) => {
    res.status(200).json(data_1.prestamos);
});
// POST /libros/:id/prestar
const prestarLibro = (req, res) => {
    const id = parseInt(req.params.id);
    const libro = data_1.libros.find(l => l.id === id);
    if (!libro)
        return res.status(404).json({ error: "Libro no encontrado" });
    const { usuario } = req.body;
    if (!usuario || typeof usuario !== 'string' || usuario.trim() === "") {
        return res.status(400).json({ error: "Se requiere un nombre de usuario válido" });
    }
    if (!libro.disponible)
        return res.status(409).json({ error: "El libro ya está prestado" });
    const prestamosActivosUsuario = data_1.prestamos.filter(p => p.usuario === usuario && p.fechaDevolucion === null);
    if (prestamosActivosUsuario.length >= 2) {
        return res.status(409).json({ error: "El usuario ya tiene 2 libros prestados, límite alcanzado" });
    }
    libro.disponible = false;
    const nuevoPrestamoId = data_1.prestamos.length > 0 ? Math.max(...data_1.prestamos.map(p => p.id)) + 1 : 1;
    const nuevoPrestamo = {
        id: nuevoPrestamoId,
        libroId: id,
        usuario,
        fechaPrestamo: (0, data_1.obtenerFechaActual)(),
        fechaDevolucion: null
    };
    data_1.prestamos.push(nuevoPrestamo);
    res.status(201).json(nuevoPrestamo);
};
exports.prestarLibro = prestarLibro;
// POST /libros/:id/devolver
const devolverLibro = (req, res) => {
    const id = parseInt(req.params.id);
    const libro = data_1.libros.find(l => l.id === id);
    if (!libro)
        return res.status(404).json({ error: "Libro no encontrado" });
    if (libro.disponible)
        return res.status(409).json({ error: "El libro no se encuentra prestado actualmente" });
    const prestamoActivo = data_1.prestamos.find(p => p.libroId === id && p.fechaDevolucion === null);
    if (!prestamoActivo)
        return res.status(404).json({ error: "No se encontró un registro de préstamo activo para este libro" });
    prestamoActivo.fechaDevolucion = (0, data_1.obtenerFechaActual)();
    libro.disponible = true;
    res.status(200).json({ mensaje: "Libro devuelto con éxito", prestamo: prestamoActivo, libro });
};
exports.devolverLibro = devolverLibro;
exports.default = router;
