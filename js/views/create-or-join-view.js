import { gameController } from "../controller/game-controller.js";
import template from "../templates/create-or-join-template.js";
import { View } from "./view.js";

export class CreateOrJoinView extends View
{
    constructor()
    {
        super(template);

        gameController.addEventListener("update", () => { this.#notify(); });
    }

    initialize()
    {
        this.#attachEvents();
    }

    #notify()
    {
        if (gameController.isGameJoined() === false)
            this.#display();
        else
            this.#hide();
    }

    #display()
    {
        const root = document.getElementById("root");

        if (root)
        {
            root.innerHTML = "";
            this.appendTo(root);
        }
    }

    #hide()
    {
        document.querySelector(".create-or-join-view")?.remove();
    }

    #attachEvents()
    {
        const btnCreateGame = document.getElementById("create-game");
        btnCreateGame?.addEventListener("click", () =>
        {
            const playerName = btnCreateGame.closest("form").querySelector(".player-name");
            gameController.createGame(playerName?.value ?? "");
        })

        const btnJoinGame = document.getElementById("join-game");
        btnJoinGame?.addEventListener("click", () =>
        {
            const form = btnJoinGame.closest("form");
            const playerName = form.querySelector(".player-name");
            const gameCode = form.querySelector(".game-code");
            gameController.joinGame(gameCode?.value ?? "", playerName?.value ?? "");
        })
    }
}