import { Router, Request, Response } from 'express';
import { libros, prestamos } from '../data';
import { Libro } from '../types';

const router = Router();

// GET /libros
router.get('/', (req: Request, res: Response) => {
    res.status(200).json(libros);
});

// GET /libros/:id
router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const libro = libros.find(l => l.id === id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
    res.status(200).json(libro);
});

// POST /libros
router.post('/', (req: Request, res: Response) => {
    const { titulo, autor, año } = req.body;
    if (!titulo || !autor || año === undefined) {
        return res.status(400).json({ error: "Faltan campos obligatorios (titulo, autor, año)" });
    }
    const duplicado = libros.some(
        l => l.titulo.toLowerCase() === titulo.toLowerCase() && l.autor.toLowerCase() === autor.toLowerCase()
    );
    if (duplicado) return res.status(409).json({ error: "Ya existe un libro con el mismo título y autor" });

    const nuevoId = libros.length > 0 ? Math.max(...libros.map(l => l.id)) + 1 : 1;
    const nuevoLibro: Libro = { id: nuevoId, titulo, autor, año, disponible: true };
    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});

// PUT /libros/:id
router.put('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const index = libros.findIndex(l => l.id === id);
    if (index === -1) return res.status(404).json({ error: "Libro no encontrado" });

    const { titulo, autor, año, disponible, id: idBody } = req.body;
    if (idBody !== undefined && idBody !== id) {
        return res.status(400).json({ error: "No se permite modificar el ID del libro" });
    }
    if (!titulo || !autor || año === undefined || disponible === undefined) {
        return res.status(400).json({ error: "PUT requiere todos los campos (titulo, autor, año, disponible)" });
    }

    libros[index] = { id, titulo, autor, año, disponible };
    res.status(200).json(libros[index]);
});

// PATCH /libros/:id
router.patch('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const libro = libros.find(l => l.id === id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    const { titulo, autor, año, disponible, id: idBody } = req.body;
    if (idBody !== undefined && idBody !== id) {
        return res.status(400).json({ error: "No se permite modificar el ID del libro" });
    }

    if (titulo !== undefined) libro.titulo = titulo;
    if (autor !== undefined) libro.autor = autor;
    if (año !== undefined) libro.año = año;
    if (disponible !== undefined) libro.disponible = disponible;

    res.status(200).json(libro);
});

// DELETE /libros/:id
router.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const index = libros.findIndex(l => l.id === id);
    if (index === -1) return res.status(404).json({ error: "Libro no encontrado" });

    if (!libros[index].disponible) {
        return res.status(409).json({ error: "No se puede borrar un libro que está actualmente prestado" });
    }

    libros.splice(index, 1);
    res.status(200).json({ mensaje: "Libro eliminado correctamente" });
});

// GET /libros/:id/prestamos (Historial de préstamos de un libro)
router.get('/:id/prestamos', (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const libro = libros.find(l => l.id === id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    const historial = prestamos.filter(p => p.libroId === id);
    res.status(200).json(historial);
});

export default router;