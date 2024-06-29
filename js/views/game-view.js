import { gameController } from "../controller/game-controller.js";
import template from "../templates/game-template.js";
import { RoleView } from "./roles-view.js";
import { View } from "./view.js";
import { WaitingPlayerView } from "./waiting-player-view.js";
import { PlayView } from "./play-view.js";
import { GameStatus } from "../models/game.js";

export class GameView extends View
{
    #gameCodeCopyTimer;

    constructor()
    {
        super(template);

        this.#gameCodeCopyTimer = null;

        gameController.addEventListener("update", () => { this.#notify(); });
        gameController.addEventListener("rounds-update", () => { this.#updateScore(); });
    }

    initialize()
    {
        this.#attachEvents();
    }

    #notify()
    {
        if (gameController.isGameJoined())
            this.#display();
        else
            this.#hide();
    }

    #display()
    {
        const root = document.getElementById("root");

        if (root)
        {
            this.#hide();
            this.appendTo(root);
            this.#displayContent();
            this.#updateScore();
        }
    }

    #hide()
    {
        document.querySelector(".game-view")?.remove();
    }

    #displayContent()
    {
        this.#displayGameCode();

        const viewContent = document.querySelector(".game-view .view-content");
        if (viewContent === null)
            return;

        if (gameController.game.players.localPlayer?.hasRole())
            this.#displayPlay(viewContent);
        else
            this.#displayRoleSelection(viewContent);

        this.#displayGameStatus();
    }

    #displayGameCode()
    {
        const html = document.querySelector(".game-code");
        if (html)
            html.innerText = gameController.game.code;
    }

    #displayRoleSelection(viewContent)
    {
        const rolesView = new RoleView();
        rolesView.appendTo(viewContent);

        const waitingPlayerView = new WaitingPlayerView();
        waitingPlayerView.appendTo(viewContent);
    }

    #displayPlay(viewContent)
    {
        const playView = new PlayView();
        playView.appendTo(viewContent);
    }

    #displayGameStatus()
    {
        const gameStatus = gameController.game?.status ?? GameStatus.IN_PROGRESS;
        const statusDiv = document.querySelector(".game-status");

        if (gameStatus === GameStatus.IN_PROGRESS || statusDiv === null)
            return;

        statusDiv.innerHTML = /*html*/`
            <div>
                <h1>${gameStatus === GameStatus.LOST ? "Défaite" : "Victoire"}</h1>
                <button>Fermer</button>
            </div>
        `

        statusDiv.querySelector("button").addEventListener("click", () => { gameController.exitGame(); });

        statusDiv.classList.remove("hidden");
    }

    #updateScore()
    {
        const scoreDiv = document.querySelector(".game-score > span");
        if(scoreDiv)
            scoreDiv.innerText = gameController.game?.getScore() ?? 0;
    }

    #attachEvents()
    {
        document.getElementById("exit-game")?.addEventListener("click", () =>
        {
            gameController.exitGame();
        });

        document.querySelector(".game-view .view-header .game-code")?.addEventListener("click", () =>
        {
            const gameCode = gameController.game?.code;

            if (gameCode)
            {
                navigator.clipboard.writeText(gameCode);

                this.#checkGameCodeState(true);

                if(this.#gameCodeCopyTimer)
                    clearTimeout(this.#gameCodeCopyTimer);

                this.#gameCodeCopyTimer = setTimeout(() => {
                    this.#checkGameCodeState(false);
                    this.#gameCodeCopyTimer = null;
                }, 3000)
            }
        })
    }

    #checkGameCodeState(checked)
    {
        const gameCodeDiv = document.querySelector(".game-view .view-header .game-code");
        if(gameCodeDiv)
            gameCodeDiv.classList.toggle("copied", checked);
    }

}