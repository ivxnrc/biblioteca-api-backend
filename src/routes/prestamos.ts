import { Router, Request, Response } from 'express';
import { libros, prestamos, obtenerFechaActual } from '../data';
import { Prestamo } from '../types';

const router = Router();

// GET /prestamos
router.get('/', (req: Request, res: Response) => {
    res.status(200).json(prestamos);
});

// POST /libros/:id/prestar
export const prestarLibro = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const libro = libros.find(l => l.id === id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    const { usuario } = req.body;
    if (!usuario || typeof usuario !== 'string' || usuario.trim() === "") {
        return res.status(400).json({ error: "Se requiere un nombre de usuario válido" });
    }

    if (!libro.disponible) return res.status(409).json({ error: "El libro ya está prestado" });

    const prestamosActivosUsuario = prestamos.filter(p => p.usuario === usuario && p.fechaDevolucion === null);
    if (prestamosActivosUsuario.length >= 2) {
        return res.status(409).json({ error: "El usuario ya tiene 2 libros prestados, límite alcanzado" });
    }

    libro.disponible = false;
    const nuevoPrestamoId = prestamos.length > 0 ? Math.max(...prestamos.map(p => p.id)) + 1 : 1;
    const nuevoPrestamo: Prestamo = {
        id: nuevoPrestamoId,
        libroId: id,
        usuario,
        fechaPrestamo: obtenerFechaActual(),
        fechaDevolucion: null
    };

    prestamos.push(nuevoPrestamo);
    res.status(201).json(nuevoPrestamo);
};

// POST /libros/:id/devolver
export const devolverLibro = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const libro = libros.find(l => l.id === id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });

    if (libro.disponible) return res.status(409).json({ error: "El libro no se encuentra prestado actualmente" });

    const prestamoActivo = prestamos.find(p => p.libroId === id && p.fechaDevolucion === null);
    if (!prestamoActivo) return res.status(404).json({ error: "No se encontró un registro de préstamo activo para este libro" });

    prestamoActivo.fechaDevolucion = obtenerFechaActual();
    libro.disponible = true;

    res.status(200).json({ mensaje: "Libro devuelto con éxito", prestamo: prestamoActivo, libro });
};

export default router;