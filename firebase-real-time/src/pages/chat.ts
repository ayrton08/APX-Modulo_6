import {state} from "../state"
type Message = {
    from: string;
    message: string;
};
class ChatPage extends HTMLElement {
    connectedCallback() {
        state.subscribe(()=>{
            const currentState = state.getState()
            this.messages = currentState.messages
            this.render()
        })
        this.render();
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
            ${this.messages.map((m) => {
                return `<div class="message">${m.from}:${m.message}</div>`;
            })}            
            </div>
            <form class="submit-message">
                <input type="text" name="new-message">
                <button>Enviar</button>
            </form>
        </div>
        `;
    }
}
customElements.define("chat-page", ChatPage);
