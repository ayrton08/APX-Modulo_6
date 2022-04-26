import { state } from "../state";
type Message = {
    from: string;
    messages: string;
};
class ChatPage extends HTMLElement {
    connectedCallback() {
        state.subscribe(() => {
            const currentState = state.getState();
            this.messages = currentState.messages;
            this.render();
        });

        this.render();
    }

    addListeners() {
        const form = this.querySelector(".submit-message");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const target = event.target as any;
            state.pushMessage(target["new-message"].value);
        });
    }

    messages: Message[] = [];
    render() {
        this.innerHTML = `
        <div>
        <h1>ChatPage</h1>
            <div class="messages">
            ${this.messages
                .map((m) => {
                    if (m.from === state.data.name) {
                        return `<div class="myself">
                        <span >${m.from}:</span><span class="my-message"> ${m.messages}</span>
                        </div>`;
                    }
                    if (m.from !== state.data.name) {
                        return `<div class="other"><span>${m.from}:</span> <span class="other-message"> ${m.messages}</span></div>`;
                    }
                })
                .join("")}
                        
            </div>
            <form class="submit-message">
                <input type="text" name="new-message">
                <button>Enviar</button>
            </form>
            </div>
        `;
        this.addListeners();
    }
}


customElements.define("chat-page", ChatPage);
