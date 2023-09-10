const express = require('express');
const app = express();

app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido");
});

/*
Verbos HTTP
GET /OBTENER
POST /GUARDAR DATOS
PATCH /ACTUALIZACIÓN DE DATOS (RECURSO EN ESPECÍFICO)
PUT /ACTUALIZACIÓN DE DATOS (MODIFICAR TODOS LOS ELEMENTOS)
DELETE /ELIMINAR UN RECURSO

req - petición del cliente (navegador)
res - respuesta que vamos a dar
next -
*/

app.listen(3000, () => {
    console.log("server is runing...")
});