import { gameController } from "../controller/game-controller.js";
import template from "../templates/waiting-player-template.js";
import { View } from "./view.js";

export class WaitingPlayerView extends View
{
    constructor()
    {
        super(template);

        gameController.addEventListener("players-update", () => { this.#notify(); })
    }

    initialize()
    {
        this.#displayStatus();
    }

    #notify()
    {
        this.#displayStatus();
    }

    #displayStatus()
    {
        const otherPlayer = gameController.game.players.remotePlayer;

        const div = document.querySelector(".waiting-player-view");

        if(div == null)
            return;

        if (otherPlayer)
        {
            div.innerHTML = `<span></span> a rejoint la partie.`;
            div.querySelector("span").innerText = otherPlayer.name;
        }
        else
        {
            div.innerHTML = `En attente d'un autre joueur...`;
        }
    }
}