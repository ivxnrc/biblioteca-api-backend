import { Router, Request, Response } from 'express';
import { libros } from '../data';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    const totalLibros = libros.length;
    const disponibles = libros.filter(l => l.disponible).length;
    const prestadosCount = totalLibros - disponibles;

    let autorConMasLibros = null;
    if (totalLibros > 0) {
        const conteoAutores: { [autor: string]: number } = {};
        libros.forEach(l => {
            conteoAutores[l.autor] = (conteoAutores[l.autor] || 0) + 1;
        });

        let maxLibros = 0;
        for (const autor in conteoAutores) {
            if (conteoAutores[autor] > maxLibros) {
                maxLibros = conteoAutores[autor];
                autorConMasLibros = autor;
            }
        }
    }

    res.status(200).json({ totalLibros, disponibles, prestados: prestadosCount, autorConMasLibros });
});

export default router;