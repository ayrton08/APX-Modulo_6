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
    .set({ // la funcion set() le guarda a esa refencia la data
        prueba: false,
        nombre: "Ayrton"
    }) // esto devueve una promesa asi que al final devulve que paso con la operacion
    .then((res) => {
        console.log(res);
    });

export { firestore };
