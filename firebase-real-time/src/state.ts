const API_BASE_URL = "http://localhost:3000";
import { getDatabase, ref, onValue } from "firebase/database";
import { rtdb } from "./rtdb";
import map from "lodash/map";

type Message = {
    from: string;
    messages: string;
};

const state = {
    data: {
        name: "",
        messages: [],
    },

    listeners: [],

    init() {
        const chatroomsRef = ref(rtdb, "/chatrooms/general");

        const currentState = this.getState();
        onValue(chatroomsRef, (snapshot) => {
            const messagesFromServer = snapshot.val();
            const messagesList = map(messagesFromServer.messages);
            

            this.setState(messagesList);
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
        const body = JSON.stringify({
            from: this.data.name,
            messages: messages,
        })
        
        fetch(API_BASE_URL + "/messages", {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",

            },
        })
    },
    
    setState(messages) {
       
        this.data.messages = messages;


        for (const cb of this.listeners) {
            cb();
        }
        console.log("Soy el state, he cambiado");
    },

    subscribe(callback: (any) => any) {
        this.listeners.push(callback);
    },
};

export { state };
