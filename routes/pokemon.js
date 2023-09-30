const express = require('express');
const pokemon = express.Router();
// const pk = require('../pokedex.json').pokemon;
const db = require('../config/database');

pokemon.post("/", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if(pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query += ` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
        
        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Pokemon insertado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });

});

pokemon.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM pokemon WHERE pok_id=${req.params.id}`;
    const rows = await db.query(query);

    if(rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Pokemon borrado correctamente" });
    }
    return res.status(400).json({ code: 400, message: "Pokemon no encontrado" });
})

pokemon.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    
    if(pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height=${pok_height},`;
        query += `pok_weight=${pok_weight}, pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id}`;
        
        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Pokemon actualizado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

pokemon.patch("/:id([0-9]{1,3})", async (req, res, next) => {
    if (req.body.pok_name) {
        let query = `UPDATE pokemon SET pok_name='${req.body.pok_name}' WHERE pok_id=${req.params.id}`;
        
        const rows = await db.query(query);

        if(rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Pokemon actualizado correctamente" });
        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.get("/", async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({ code: 200, message: pkmn });
    //return res.status(200).send(pk);
});

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    // (id >= 0 && id <= 150) ?
    // res.status(200).send(pokemon[req.params.id - 1]) : 
    // res.status(404).send("Pokemon no encontrado");
    if (id >= 1 && id <= 722) {
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id + ";");
        return res.status(200).json({ code: 200, message: pkmn });
        //return res.status(200).send(pk[req.params.id - 1])
    } 
    return res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
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
        return res.status(200).json({ code: 200, message: pkmn });
    }
    return res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
});

//Cada vez que queramos importar através de un requiere también lo debemos exportar
module.exports = pokemon;