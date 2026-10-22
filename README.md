# Práctica 2 de Backend: Biblioteca API

API REST hecha con **Node.js**, **Express** y **TypeScript** para gestionar el sistema de libros, usuarios y préstamos de la biblioteca.

## Tecnologías usadas
* Node.js
* Express
* TypeScript
* ts-node-dev / nodemon

## Instalación

1. Clonar el repositorio:
   git clone https://github.com/ivxnrc/biblioteca-api-backend.git

2. Entrar en la carpeta del proyecto e instalar las dependencias:
   cd biblioteca-api-backend
   npm install

3. Iniciar el servidor local en modo desarrollo:
   npm run dev

El servidor se ejecutará en `http://localhost:3000`.

## Pruebas principales de la práctica

### Libros (`/libros.`)
* `GET /libros` - Obtener el listado de todos los libros.
* `GET /libros/:id` - Obtener un libro por su ID.
* `POST /libros` - Añadir un nuevo libro al catálogo.
* `PUT /libros/:id` - Actualizar información de un libro.
* `DELETE /libros/:id` - Eliminar un libro.

### Préstamos (`/prestamos`)
* `GET /prestamos` - Consultar los préstamos registrados.
* `POST /prestamos` - Registrar la salida/préstamo de un libro.
* `PUT /prestamos/devolver/:id` - Marcar un libro como devuelto.

---
Proyecto desarrollado para la práctica de Backend API REST.
