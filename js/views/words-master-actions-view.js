import { View } from "./view.js";
import template from "../templates/words-master-actions-template.js";
import { gameController } from "../controller/game-controller.js";

export class WordsMasterActionsView extends View
{
    constructor()
    {
        super(template);

        gameController.addEventListener("rounds-update", () => {this.#updateActions(); });
    }

    initialize()
    {
        this.#updateActions();
        this.#attachEvents();
    }

    #updateActions()
    {
        const actions = document.getElementById("actions");
        const waitingMessage = document.getElementById("waiting-message");

        if(actions === null || waitingMessage === null)
            return;

        actions.classList.toggle("hidden", gameController.game.canLocalPlayerSendClue() === false);
        waitingMessage.classList.toggle("hidden", gameController.game.canLocalPlayerSendClue());
    }

    #attachEvents()
    {
        document.getElementById("send-clue")?.addEventListener("click", () =>
        {
            const clue = document.getElementById("txt-clue")?.value ?? "";
            const nbWords = document.getElementById("txt-nb-words")?.value ?? 0;

            gameController.sendClue(clue, nbWords);
        });
    }
}