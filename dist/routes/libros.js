"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_1 = require("../data");
const router = (0, express_1.Router)();
// GET /libros
router.get('/', (req, res) => {
    res.status(200).json(data_1.libros);
});
// GET /libros/:id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = data_1.libros.find(l => l.id === id);
    if (!libro)
        return res.status(404).json({ error: "Libro no encontrado" });
    res.status(200).json(libro);
});
// POST /libros
router.post('/', (req, res) => {
    const { titulo, autor, año } = req.body;
    if (!titulo || !autor || año === undefined) {
        return res.status(400).json({ error: "Faltan campos obligatorios (titulo, autor, año)" });
    }
    const duplicado = data_1.libros.some(l => l.titulo.toLowerCase() === titulo.toLowerCase() && l.autor.toLowerCase() === autor.toLowerCase());
    if (duplicado)
        return res.status(409).json({ error: "Ya existe un libro con el mismo título y autor" });
    const nuevoId = data_1.libros.length > 0 ? Math.max(...data_1.libros.map(l => l.id)) + 1 : 1;
    const nuevoLibro = { id: nuevoId, titulo, autor, año, disponible: true };
    data_1.libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});
// PUT /libros/:id
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data_1.libros.findIndex(l => l.id === id);
    if (index === -1)
        return res.status(404).json({ error: "Libro no encontrado" });
    const { titulo, autor, año, disponible, id: idBody } = req.body;
    if (idBody !== undefined && idBody !== id) {
        return res.status(400).json({ error: "No se permite modificar el ID del libro" });
    }
    if (!titulo || !autor || año === undefined || disponible === undefined) {
        return res.status(400).json({ error: "PUT requiere todos los campos (titulo, autor, año, disponible)" });
    }
    data_1.libros[index] = { id, titulo, autor, año, disponible };
    res.status(200).json(data_1.libros[index]);
});
// PATCH /libros/:id
router.patch('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = data_1.libros.find(l => l.id === id);
    if (!libro)
        return res.status(404).json({ error: "Libro no encontrado" });
    const { titulo, autor, año, disponible, id: idBody } = req.body;
    if (idBody !== undefined && idBody !== id) {
        return res.status(400).json({ error: "No se permite modificar el ID del libro" });
    }
    if (titulo !== undefined)
        libro.titulo = titulo;
    if (autor !== undefined)
        libro.autor = autor;
    if (año !== undefined)
        libro.año = año;
    if (disponible !== undefined)
        libro.disponible = disponible;
    res.status(200).json(libro);
});
// DELETE /libros/:id
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data_1.libros.findIndex(l => l.id === id);
    if (index === -1)
        return res.status(404).json({ error: "Libro no encontrado" });
    if (!data_1.libros[index].disponible) {
        return res.status(409).json({ error: "No se puede borrar un libro que está actualmente prestado" });
    }
    data_1.libros.splice(index, 1);
    res.status(200).json({ mensaje: "Libro eliminado correctamente" });
});
// GET /libros/:id/prestamos (Historial de préstamos de un libro)
router.get('/:id/prestamos', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = data_1.libros.find(l => l.id === id);
    if (!libro)
        return res.status(404).json({ error: "Libro no encontrado" });
    const historial = data_1.prestamos.filter(p => p.libroId === id);
    res.status(200).json(historial);
});
exports.default = router;
