//Dependencies
const morgan = require('morgan');
const express = require('express');
const app = express();
//Routers
const pokemon = require('./routes/pokemon');
const user = require('./routes/user');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');

//Herramienta de desarrollo que no se debe de utilizar en producción para no da rmás información de la que se debería
app.use(morgan('dev'));
// Añadir capas que procesaran las peticiones y que les harán alguna modificación o revisarán algun dato.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", index);
app.use("/user", user);
//Middleware algo que se encarga de procesar una petición
app.use(auth);
app.use("/pokemon", pokemon);
//Express es secuencial, si no coincide la ruta con la anterior esta se ejecutará
app.use(notFound);

/*
Verbos HTTP
GET - OBTENER RECURSOS
POST - GUARDAR DATOS (ALMACENAR/CREAR RECURSOS)
PATCH - ACTUALIZACIÓN DE DATOS (MODIFICAR UNA PARTE DE UN RECURSO)
PUT - ACTUALIZACIÓN DE DATOS (MODIFICAR UN RECURSO COMPLETO)
DELETE - ELIMINAR UN RECURSO (BORRAR UN RECURSO)

req - petición del cliente (navegador)
res - respuesta que vamos a dar
next -

Entre llaves: extraer el elemento que estamos pidiendo
*/

// Regex Javascript


app.listen(process.env.PORT || 3000, () => {
    console.log("server is runing...")
});