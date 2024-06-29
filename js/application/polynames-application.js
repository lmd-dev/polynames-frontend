import { gameController } from "../controller/game-controller.js";
import { GameView } from "../views/game-view.js";
import { CreateOrJoinView } from "../views/create-or-join-view.js";

export class PolynamesApplication
{
    /** @type {CreateOrJoinView} */
    #createOrJoinView;

    /** @type {GameView} */
    #gameView;

    constructor()
    {
        this.#createViews();

        gameController.start();
    }

    #createViews()
    {
        this.#createOrJoinView = new CreateOrJoinView();
        this.#gameView = new GameView();
    }
}