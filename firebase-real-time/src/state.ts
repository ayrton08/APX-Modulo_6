const API_BASE_URL = "http://localhost:3000";
import * as db from "firebase/database";
import { rtdb } from "./rtdb";

type Message = {
    from: string;
    message: string;
};

const state = {
    data: {
        nombre: "",
        messages: [],
    },

    listeners: [],

    init() {
        const chatroomsRef = db.ref(rtdb, "/messages/" + data.newId);

        db.onValue(chatroomsRef, (snapshot) => {
            const valor = snapshot.val();
            document.querySelector(".id").innerHTML = data.newId;
            document.querySelector(".root").innerHTML = JSON.stringify(valor);
        });
    },

    getState() {
        return this.data;
    },

    setname(nombre: string) {
        const currentState = this.getState();
        currentState.name = nombre;
        this.setState(currentState);
    },

    pushMessage(message: Message) {
        fetch(API_BASE_URL + "/messages", {
            method: "post",
            body: JSON.stringify(message),
        });
    },

    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
        }
        console.log("Soy el state, he cambiado", this.data);
    },

    subscribe(callback: (any) => any) {
        this.listeners.push(callback);
    },
};

export { state };
