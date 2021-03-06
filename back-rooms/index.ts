import { firestore, rtdb } from "./dataBase";
import * as express from "express";
import { nanoid } from "nanoid";
import * as cors from "cors";
const port = 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log("El server esta funcioando en el puerto... " + port);
});

app.post("/prueba", (req, res) => {
    res.json(req.body);
});

const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");

app.post("/signup", (req, res) => {
    const email = req.body.email;
    const nombre = req.body.nombre;
    userCollection
        .where("email", "==", email)
        .get()
        .then((search) => {
            if (search.empty) {
                userCollection
                    .add({
                        email,
                        nombre,
                    })
                    .then((newUserRef) => {
                        res.json({
                            id: newUserRef.id,
                            new: true,
                        });
                    });
            } else {
                res.status(400).json({
                    message: "user already exists",
                });
            }
        });
});

app.post("/auth", (req, res) => {
    const { email } = req.body;

    userCollection
        .where("email", "==", email)
        .get()
        .then((search) => {
            if (search.empty) {
                res.status(404).json({
                    message: "not found",
                });
            } else {
                res.json({
                    id: search.docs[0].id,
                });
            }
        });
});

app.post("/rooms", (req, res) => {
    const { userId } = req.body;
    userCollection
        .doc(userId.toString())
        .get()
        .then((doc) => {
            if (doc.exists) {
                const roomRef = rtdb.ref("rooms/" + nanoid());
                roomRef
                    .set({
                        messages: [],
                        owner: userId,
                    })
                    .then(() => {
                        const roomLongId = roomRef.key;
                        const roomId = 1000 + Math.floor(Math.random() * 999);
                        roomsCollection
                            .doc(roomId.toString())
                            .set({
                                rtdbRoomId: roomLongId,
                            })
                            .then(() => {
                                res.json({
                                    id: roomId.toString(),
                                });
                            });
                    });
            } else {
                res.status(401).json({
                    message: "no existis",
                });
            }
        });
});

app.get("/room/:roomId", (req, res) => {
    const { userId } = req.query;
    const { roomId } = req.params;
    
    userCollection
        .doc(userId.toString())
        .get()
        .then((doc) => {
            if (doc.exists) {
                roomsCollection.doc(roomId).get().then((snap)=>{
                    const data = snap.data()
                    res.json(data)
                })
            } else {
                res.status(401).json({
                    message: "no existis",
                });
            }
        });
    
});
