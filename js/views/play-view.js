import { View } from "./view.js";
import template from "../templates/play-template.js";
import { gameController } from "../controller/game-controller.js";
import { IntuitionMasterActionsView } from "./intuition-master-actions-view.js";
import { WordsMasterActionsView } from "./words-master-actions-view.js";
import { RoundsView } from "./rounds-view.js";
import { CardsView } from "./cards-view.js";

export class PlayView extends View
{
    constructor()
    {
        super(template);
    }

    initialize()
    {
        this.#display();
    }

    #display()
    {
        this.#displayLeft();
        this.#displayCenter();
    }

    #displayLeft()
    {
        const leftPart = document.querySelector(".play-view .left-part");
        if (leftPart)
        {
            const roundsView = new RoundsView();
            roundsView.appendTo(leftPart);
        }
    }

    #displayCenter()
    {
        const centerPart = document.querySelector(".play-view .center-part");
        if (centerPart)
        {
            const cardsView = new CardsView();
            cardsView.appendTo(centerPart);

            if (gameController.game.canLocalPlayerSeeCardsColor())
            {
                const wordsMasterActionsView = new WordsMasterActionsView();
                wordsMasterActionsView.appendTo(centerPart);
            }
            else
            {
                const intuitionMasterActionsView = new IntuitionMasterActionsView();
                intuitionMasterActionsView.appendTo(centerPart);
            }
        }
    }
}