"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_1 = require("../data");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    const totalLibros = data_1.libros.length;
    const disponibles = data_1.libros.filter(l => l.disponible).length;
    const prestadosCount = totalLibros - disponibles;
    let autorConMasLibros = null;
    if (totalLibros > 0) {
        const conteoAutores = {};
        data_1.libros.forEach(l => {
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
exports.default = router;
