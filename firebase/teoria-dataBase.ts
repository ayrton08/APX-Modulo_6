import * as admin from "firebase-admin";
import * as serviceAccount from "./key.json"; // importa la clave privada que esta en el json

// admin es un objeto que representa toda la cuneta de firestone
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    databaseURL: "https://apx-dwf-m6-5b96e-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore(); // en esta contante se guarda firestone

firestore
    .doc("test/hola") // la funcion doc() devulve una referencia a un documento de la base de datos
    .set({
        // la funcion set() le guarda a esa refencia la data
        prueba: false,
        nombre: "Ayrton",
    }) // esto devueve una promesa asi que al final devulve que paso con la operacion
    .then((res) => {
        console.log(res);
    });

const usersCollection = firestore.collection("users"); // esta variable representa la collection que esta en la base de datos, despues de esto se le puede ejecutar las funciones
const productsCollection = firestore.collection("products");

const ayrtonDoc = usersCollection.doc("RzPvKhLFahv6fhwz5sP5");

ayrtonDoc.get().then((snap) => {
    console.log(snap.exists); // exists devuelve un bollean
    console.log(snap.data()); // el metodo data() me devuelve solo la data no toda la info del snap
});

ayrtonDoc.set({
    nombre: "joaquin",
    direccion: "el dorado",
});
// set() recibe un objeto para pasar la data, pero pisa toda la data de la base de datos

ayrtonDoc
    .update({
        nombre: "ayrton",
    })
    .then((res) => {
        console.log(res);
    });
// update() recibe un objeto para pasar la data

// usersCollection
//     .where("nombre", "==", "ayrton")
//     .get()
//     .then((snap) => {
//         console.log(snap);
//     });

// usersCollection.get().then((snap) => {
//     let docs = snap.docs
//     for (let doc of docs) {
//         console.log(doc.data());

//     }
// });

// where(llevar 3 parametros para crear la condicion) le agrega una condicion
// get() esta funcion le pide toda la data de la collection si es que no tiene condiciones y esto devuelve una promesa


