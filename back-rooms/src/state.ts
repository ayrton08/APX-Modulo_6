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
        email: "",
        fullName: "",
        userId: "",
        messages: [],
        rtdbRoomId: "",
    },

    listeners: [],

    init() {
        // const chatroomsRef = ref(rtdb, "/chatrooms/general");
        // const currentState = this.getState();
        // onValue(chatroomsRef, (snapshot) => {
        //     const messagesFromServer = snapshot.val();
        //     const messagesList = map(messagesFromServer.messages);
        //     this.setState(messagesList);
        // });
    },

    getState() {
        return this.data;
    },

    setName(name: string) {
        const currentState = this.getState();
        currentState.name = name;
        this.setState(currentState);
    },

    // pushMessage(messages: string) {
    //     const body = JSON.stringify({
    //         from: this.data.name,
    //         messages: messages,
    //     });

    //     fetch(API_BASE_URL + "/messages", {
    //         method: "POST",
    //         body: body,
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    // },

    setEmailAndName(params: { email: string; fullName: string }) {
        const currentState = this.getState();
        (currentState.fullName = params.fullName),
            (currentState.email = params.email);
        this.setState(currentState);
    },

    signIn(callback) {
        const currentState = this.getState();
        if (currentState.email) {
            return fetch(API_BASE_URL + "/auth", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: currentState.email }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    currentState.userId = data.id;
                    this.setState(currentState);
                    callback();
                });
        } else {
            console.error("No hay un email en el State");
        }
    },

    askNewRoom(callback) {
        const currentState = this.getState();
        if (currentState.userId) {
            fetch(API_BASE_URL + "/rooms", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: currentState.userId }),
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    (currentState.roomId = data.id),
                        this.setState(currentState);
                    callback();
                });
        } else {
            console.error("No hay userId");
        }
    },

    accessToRoom(roomId, callback) {
        const currentState = this.getState();
        fetch(
            API_BASE_URL + "/rooms/" + roomId + "?userId" + currentState.userId,
            {}
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                (currentState.rtdbRoomId = data.rtdbRoomId), this.setState(currentState);
                callback();
            });
    },

    setState(newState) {
        this.data = newState;

        for (const cb of this.listeners) {
            cb();
        }
        console.log("Soy el state, he cambiado " + state);
    },

    subscribe(callback: (any) => any) {
        this.listeners.push(callback);
    },
};

export { state };
