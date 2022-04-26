import "./pages/index"
import "./pages/chat"
import "./router"
import {state} from "./state"
import { initializeApp } from "firebase/app";


// const API_BASE_URL = "http://localhost:3000";



// const chatroomsRef = db.ref(database, "/chatrooms/1234/participants");

// db.onValue(chatroomsRef, (snapshot) => {
//     const valor = snapshot.val();
//     const div = document.querySelector(".root");
//     div.innerHTML = JSON.stringify(valor);
// });

// onValue() esta leyendo o escuchando todos los cambios que se realizen en al referencia de la base de datos

// db.set(db.ref(database, "chatrooms/1234/participants"), {
//     "4": "joaquin",
// });

// db.update(db.ref(database, "chatrooms/1234/participants"), {
//     "1": "ayrton",
// });

// function conectarAlChatroom() {
//     fetch(API_BASE_URL + "/chatrooms", {
//         method: "post",
//     })
//         .then((res) => {
//             return res.json();
//         })
//         .then((data) => {
//             const chatroomsRef = db.ref(database, "/chatrooms/" + data.newId);

//             db.onValue(chatroomsRef, (snapshot) => {
//                 const valor = snapshot.val();
//                 document.querySelector(".id").innerHTML = data.newId;
//                 document.querySelector(".root").innerHTML =
//                     JSON.stringify(valor);
//             });
//         });
// }

(function () {
    state.init()
    
    // const button = document.querySelector(".conectar");
    // button.addEventListener("click", conectarAlChatroom);
})();
