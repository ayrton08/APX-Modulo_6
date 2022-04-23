import {Router} from "@vaadin/router"
import {state} from "../state"

class Home extends HTMLElement {
    connectedCallback() {
        this.render();
        const form = this.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const target = event.target as any;
            console.log(target.name.value);
            state.setName(target.name.value)
            Router.go("/chat")
        });
    }
    render() {
        this.innerHTML = `
        <h1>HomePage</h1>
        <form class="form">
            <div>
                <label>Tu nombre</label>
            </div>
            <input type="text" name="name"/>
            <button>Comenzar</button>
        </form>
        `;
    }
}
customElements.define("home-page", Home);
