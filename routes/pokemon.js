const express = require('express');
const pokemon = express.Router();
// const pk = require('../pokedex.json').pokemon;
const db = require('../config/database');

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
})

pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
    //return res.status(200).send(pk);
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id-1;
    const pkmn = await db.query("SELECT * FROM pokemon");
    // (id >= 0 && id <= 150) ?
    // res.status(200).send(pokemon[req.params.id - 1]) : 
    // res.status(404).send("Pokemon no encontrado");
    if (id >= 0 && id <= 150) {
        return res.status(200).json(pkmn[id]);
        //return res.status(200).send(pk[req.params.id - 1])
    } 
    return res.status(404).send("Pokemon no encontrado");
});

pokemon.get('/:name([A-Zaz]+)', async (req, res, next) => {
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name = '" + name + "';");
    /* for(i = 0; i < pokemon.length; i++) {
        if(pokemon[i].name.toUpperCase() == name.toUpperCase()) {
            return res.status(200).send(pokemon[i]);
        }
    } */

    // OPERADOR TERNARIO: condición ? valor si verdadero : valor si falso
    // usar cuando queremos que de un if se retorne algo

    // && si las dos condiciones son verdaderas, devuelve lo que le sigue como en las tablas de verdad

    /* const pkmn = pk.filter((p) => {
        return (p.name.toUpperCase() == name.toUpperCase()) && p;
    }); */

    if (pkmn.length > 0) {
        return res.status(200).json(pkmn);
    }
    return res.status(404).send("Pokemon no encontrado");
});

//Cada vez que queramos importar através de un requiere también lo debemos exportar
module.exports = pokemon;