"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerFechaActual = exports.prestamos = exports.libros = void 0;
exports.libros = [
    { id: 1, titulo: "Clean Code", autor: "Robert C. Martin", año: 2008, disponible: true },
    { id: 2, titulo: "El Quijote", autor: "Miguel de Cervantes", año: 1605, disponible: true },
    { id: 3, titulo: "Sapiens", autor: "Yuval Noah Harari", año: 2011, disponible: false }
];
exports.prestamos = [
    { id: 1, libroId: 3, usuario: "Ana", fechaPrestamo: "2026-10-01", fechaDevolucion: null }
];
const obtenerFechaActual = () => {
    return new Date().toISOString().split('T')[0];
};
exports.obtenerFechaActual = obtenerFechaActual;
