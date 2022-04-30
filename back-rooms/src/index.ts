import { state } from "./state";

(function () {
    state.init();
    state.setEmailAndName({
        email: "ayrtonjuarez90@gmail.com",
        fullName: "Ayrton",
    });
    state.signIn((err) => {
        if (err) {
            console.error("Hubo unn error");
        }
        state.askNewRoom();
    });
})();
