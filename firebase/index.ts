import { firestore, rtdb } from "./dataBase";
import * as bodyParser from "body-parser";
import * as express from "express";
import { nanoid } from "nanoid";
import * as cors from "cors"
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors())

const usersCollection = firestore.collection("users");

app.get("/users/", function (req, res) {
    res.json(["todos los usuarios"]);
});

app.post("/chatrooms/", function (req, res) {
    const newId = nanoid();
    const chatroomRef = rtdb.ref("/chatrooms/" + newId);
    chatroomRef.set(
        {
            type: "chatroom",
        },
        () => {
            res.json({
                newId,
            });
        }
    );
});

app.post("/messages/", function (req, res) {
    res.json(["todos los usuarios"]);
});

app.get("/users/:userId", function (req, res) {
    res.json({
        message: "un usuario en particular",
        params: req.params,
    });

    const userId = req.params.userId;
    const userDoc = usersCollection.doc(userId);
    userDoc.get().then((userSnap) => {
        const userData = userSnap.data();
        res.json(userData);
    });
});

app.post("/users/", function (req, res) {
    usersCollection
        .doc()
        .create(req.body)
        .then((response) => {
            console.log(response);
        }),
        res.json({
            id: 1,
            name: "usuarios creado",
        });

    const newUserDoc = usersCollection.doc();
    newUserDoc.create(req.body).then(() => {
        console.log(newUserDoc.id);
        res.json({
            id: newUserDoc.id,
        });
    });
});

app.patch("/users/:id", function (req, res) {
    console.log(req.params);
    res.json({
        id: 1,
        name: "usuarios modificado",
    });
});

app.patch("/users/:userId", function (req, res) {
    const userId = req.params.userId;
    const userDoc = usersCollection.doc(userId);
    const updateObject = req.body;
    updateObject.updatedAt = new Date();

    userDoc.update(updateObject).then((result) => {
        console.log(result);
        res.json({ message: "ok" });
    });
});

app.delete("/users/:userId", function (req, res) {
    const userId = req.params.userId;
    const userDoc = usersCollection.doc(userId);
    const updateObject = req.body;

    userDoc.delete(updateObject).then((result) => {
        console.log(result);
        res.json({ message: "se borro" });
    });
});

app.listen(port, () => {
    console.log("El server esta funcioando en el puerto... " + port);
});
