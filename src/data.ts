import { Libro, Prestamo } from './types';

export let libros: Libro[] = [
    { id: 1, titulo: "Clean Code", autor: "Robert C. Martin", año: 2008, disponible: true },
    { id: 2, titulo: "El Quijote", autor: "Miguel de Cervantes", año: 1605, disponible: true },
    { id: 3, titulo: "Sapiens", autor: "Yuval Noah Harari", año: 2011, disponible: false }
];

export let prestamos: Prestamo[] = [
    { id: 1, libroId: 3, usuario: "Ana", fechaPrestamo: "2026-10-01", fechaDevolucion: null }
];

export const obtenerFechaActual = (): string => {
    return new Date().toISOString().split('T')[0];
};