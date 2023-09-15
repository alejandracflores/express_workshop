const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');

// Añadir capas que procesaran las peticiones y que les harán alguna modificación o revisarán algun dato.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    return res.status(200).send("Bienvenido al Pokedex");
});

app.post("/pokemon", (req, res, next) => {
    return res.status(200).send(req.body);
})

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

app.get("/pokemon", (req, res, next) => {
    return res.status(200).send(pokemon);
})

app.get('/pokemon/:id([0-9]{1,3})', (req, res, next) =>{
    const id = req.params.id - 1;
    // (id >= 0 && id <= 150) ? 
    // res.status(200).send(pokemon[req.params.id - 1]) : 
    // res.status(404).send("Pokemon no encontrado");
    if (id >= 0 && id <= 150) {
        return res.status(200).send(pokemon[req.params.id - 1])
    } 
    return res.status(404).send("Pokemon no encontrado");
});

app.get('/pokemon/:name([A-Zaz]+)', (req, res, next) => {
    const name = req.params.name;
    /* for(i = 0; i < pokemon.length; i++) {
        if(pokemon[i].name.toUpperCase() == name.toUpperCase()) {
            return res.status(200).send(pokemon[i]);
        }
    } */

    // OPERADOR TERNARIO: condición ? valor si verdadero : valor si falso
    // usar cuando queremos que de un if se retorne algo

    // && si las dos condiciones son verdaderas, devuelve lo que le sigue como en las tablas de verdad

    const pk = pokemon.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    });

    (pk.length > 0) ? 
    res.status(200).send(pk) : 
    res.status(404).send("Pokemon no encontrado");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is runing...")
});