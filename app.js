require('dotenv').config();
const express = require('express')

const app = express()
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Array para almacenar libros
let books = [
    { id: 1, title: 'El Quijote', author: 'Miguel de Cervantes' },
    { id: 2, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez' }
];

// Ruta inicial de nuestra aplicación
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la Biblioteca!')
  console.log(`Solicitud`);
})


// Obtener todos los elementos (libros)
app.get('/books',(req, res) => {
    res.json(books);
});

// Obtener un elemento por identificador (obtener un libro)
app.get('/book/:id', (req, res) => {
    const book = books.find(b => b.id == parseInt(req.params.id));
    !book ? res.status(404).send('Libro no encontrado') : res.json(book);
});

// Crear un nuevo libro
app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Actualizar un libro existente
app.put('/book/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Libro no encontrado');
    book.title = req.body.title;
    book.author = req.body.author;
    res.json(book);
});

// Eliminar un libro
app.delete('/book/:id', (req, res) => {
    const bookId = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookId === -1) return res.status(404).send('Libro no encontrado');
    const deletedBook = books.splice(bookId, 1);
    res.json(deletedBook[0]);
});

// Hacer que el servidor escuche en el puerto definido
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})