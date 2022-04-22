import { firestore } from "./dataBase";
import * as bodyParser from "body-parser";
import * as express from "express";
const port = 3000;

const app = express();

app.use(bodyParser.json());

const usersCollection = firestore.collection("users")


app.get("/users/", function (req, res) {
    res.json(["todos los usuarios"]);
});

app.get("/users/:userId", function (req, res) {
    // los dos puntos en el get indica que lo que sigue es dinamico, esa magia la hace express
    res.json({
        message: "un usuario en particular",
        params: req.params,
    });
});

app.post("/users/", function (req, res) {
    
    usersCollection.doc().create(req.body).then(response => {
        console.log(response)
    }),

    // usersCollection = doc() hace referencia a doc y create le graba la data que viene del req.body, en este caso la data que se esta mandando desde postman, en caso norrmal lo qeu hacen estas lineas es tomar la data que entra por el front y grabarla en la base de datos

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
