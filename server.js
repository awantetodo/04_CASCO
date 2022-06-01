// Express..
const express = require('express');
const products = require('./api/productos');
const router = express.Router();

// App Express
const app = express();

// Settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './views');
app.set('view engine', 'ejs');


// Rutas 

//Para el caso de que un producto no exista, se devolverá el objeto:
//{ error : 'producto no encontrado' }


//GET '/api/productos' -> devuelve todos los productos.
app.get('/', (req, res) => {
    const items = products.viewAll()
    res.render('formulario', { items: items, mensaje: 'No hay productos' });
});

//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
router.post('/productos/guardar', (req, res) => {

    products.addProduct(req.body)

    res.redirect('/');
})

//GET '/api/productos' -> devuelve todos los productos.
app.get('/productos/vista', (req, res) => {

    const items = products.viewAll()
    console.log(items)
    if (items.length > 0) {
        res.render('vista', { items: products.viewAll(), productsExists: true })
    } else {
        res.render('vista', { items: products.viewAll(), productsExists: false })
    }
})

app.use('/api', router);

router.get('/productos/listar', (req, res) => {

    const items = products.viewAll()
    if (items.length > 0) {
        res.json(items)
    } else {
        res.json({
            error: 'No hay productos cargados'
        })
    }
})


//GET '/api/productos/:id' -> devuelve un producto según su id.
router.get('/productos/listar/:id', (req, res) => {

    const item = products.viewByID(req.params.id)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'Producto no encontrado'
        })
    }
})


// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
router.put('/productos/actualizar/:id', (req, res) => {
    const item = products.updateProduct(req.params.id, req.body)
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'Producto no encontrado'
        })
    }
})

// DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete('/productos/borrar/:id', (req, res) => {
    const item = products.deleteProduct(req.params.id)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'Producto no encontrado'
        })
    }
})

// El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y 
// en caso de error, representar la descripción del mismo.
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', (error) => {
    console.log('Error en el servidor ', error)
})