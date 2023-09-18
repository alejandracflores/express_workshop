const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon');

//Herramienta de desarrollo que no se debe de utilizar en producción para no da rmás información de la que se debería
app.use(morgan('dev'));

// Añadir capas que procesaran las peticiones y que les harán alguna modificación o revisarán algun dato.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    return res.status(200).send("Bienvenido al Pokedex");
});

app.use("/pokemon", pokemon);

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