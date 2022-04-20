import { firestore } from "./dataBase";
import * as bodyparser from "body-parser";
import * as express from "express";

const app = express();

app.use(bodyparser);

const port = 4000;

app.get("/users/", function (req, res) {
    res.json(["todos los usuarios"]);
});

app.post("/users/", function (req, res) {
    res.json({
        id: 1,
        name: "usuarios creado",
    });
});

app.patch("/users/:id", function (req, res) {
    // los dos puntos en el path indica que lo que sigue es dinamico, esa magia la hace express
    console.log(req.params);
    res.json({
        id: 1,
        name: "usuarios modificado",
    });
});

app.listen(port, () => {
    console.log("El server esta funcioando en el puerto... " + port);
});
