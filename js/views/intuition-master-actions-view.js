import { View } from "./view.js";
import template from "../templates/intuition-master-actions-template.js";
import { gameController } from "../controller/game-controller.js";

export class IntuitionMasterActionsView extends View
{
    constructor()
    {
        super(template);

        gameController.addEventListener("rounds-update", () => { this.#updateActions(); });
    }

    initialize()
    {
        this.#updateActions();
        this.#attachEvents();
    }

    #updateActions()
    {
        const btnFinishRound = document.getElementById("finish-round");
        const waitingMessage = document.getElementById("waiting-message");

        if(btnFinishRound === null || waitingMessage === null)
            return;

        btnFinishRound.classList.toggle("hidden", gameController.game.canLocalPlayerRevealCard() === false);
        waitingMessage.classList.toggle("hidden", gameController.game.canLocalPlayerRevealCard());
    }

    #attachEvents()
    {
        document.getElementById("finish-round")?.addEventListener("click", () => {
            gameController.finishRound();
        });
    }
}