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
    // res.json({
    //     message: "un usuario en particular",
    //     params: req.params,
    // });

    const userId = req.params.userId
    const userDoc = usersCollection.doc(userId)
    userDoc.get().then(userSnap=>{
        const userData = userSnap.data()
        res.json(userData)
    })
});

app.post("/users/", function (req, res) {
    


    // usersCollection.doc().create(req.body).then(response => {
    //     console.log(response)
    // }),

    // usersCollection = doc() hace referencia a doc y create le graba la data que viene del req.body, en este caso la data que se esta mandando desde postman, en caso norrmal lo qeu hacen estas lineas es tomar la data que entra por el front y grabarla en la base de datos
    // res.json({
    //     id: 1,
    //     name: "usuarios creado",
    // });



    const newUserDoc = usersCollection.doc()
    newUserDoc.create(req.body).then(() =>{
        console.log(newUserDoc.id)
        res.json({
            id:newUserDoc.id,
        })
    })
// estas lineas de codigo crean un registro en la base de datos con la data que se le pase en este caso con el id que se genera


});

// app.patch("/users/:id", function (req, res) {
//     // los dos puntos en el path indica que lo que sigue es dinamico, esa magia la hace express
//     console.log(req.params);
//     res.json({
//         id: 1,
//         name: "usuarios modificado",
//     });
// });

app.patch("/users/:userId", function (req, res) {
    // los dos puntos en el path indica que lo que sigue es dinamico, esa magia la hace express
    const userId = req.params.userId
    const userDoc = usersCollection.doc(userId)
    const updateObject = req.body // esto es una referencia al objeto que se manda por postman (el cliente)
    updateObject.updatedAt = new Date() // le agrego la hora de cuando se realizo el update

    userDoc.update(updateObject).then(result=>{
        console.log(result)
        res.json({message:"ok"})
    })
});


app.delete("/users/:userId", function (req, res) {
    const userId = req.params.userId
    const userDoc = usersCollection.doc(userId)
    const updateObject = req.body // esto es una referencia al objeto que se manda por postman (el cliente)

    userDoc.delete(updateObject).then(result=>{
        console.log(result)
        res.json({message:"se borro"})
    })
});


app.listen(port, () => {
    console.log("El server esta funcioando en el puerto... " + port);
});
