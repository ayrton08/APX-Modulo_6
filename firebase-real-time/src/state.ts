const API_BASE_URL = "http://localhost:3000";
import * as db from "firebase/database";
import { rtdb } from "./rtdb";
import map from "lodash/map";

type Message = {
    from: string;
    message: string;
};

const state = {
    data: {
        name: "",
        messages: [],
    },

    listeners: [],

    init() {

        const chatroomsRef = db.ref(rtdb, "/chatrooms/general");
        const currentState = this.getState();
        db.onValue(chatroomsRef, (snapshot) => {
            const messagesFromServer = snapshot.val();
            // currentState.messages = messagesFromServer.messages
            const messagesList = map(messagesFromServer.messages);
            currentState.messages = messagesList;
            console.log(messagesList);

            // this.setState(currentState)
        });
    },

    getState() {
        return this.data;
    },

    setName(name: string) {
        const currentState = this.getState();
        currentState.name = name;
        this.setState(currentState);
    },

    pushMessage(messages: string) {
        fetch(API_BASE_URL + "/messages", {
            method: "post",
            headers: {
                "content-type": "aplication/json",
            },
            body: JSON.stringify({
                from: this.data.name,
                messages: messages,
            }),
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
