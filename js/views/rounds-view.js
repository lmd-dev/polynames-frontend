import { gameController } from "../controller/game-controller.js";
import template from "../templates/rounds-template.js";
import { View } from "./view.js";

export class RoundsView extends View
{
    constructor()
    {
        super(template);

        gameController.addEventListener("rounds-update", () => { this.#updateRounds(); });
    }

    initialize()
    {
        this.#updateRounds();
    }

    #updateRounds()
    {
        const list = document.querySelector(".rounds-view");
        if (list === null)
            return;

        list.innerHTML = "";
        const rounds = gameController.game.rounds.all();

        for (const round of rounds)
        {
            if(round.clue === "")
                continue;
            
            list.innerHTML += /*html*/`
                <div class="round">
                    <div class="round-clue"><span>${round.nbCardsToFind}</span>${round.clue}</div>
                    ${this.#makeWords(round)}
                </div>
            `
        }
    }

    #makeWords(round)
    {
        return round.revealedCards.map((card) => { 
            return /*html*/`<div class="round-word ${card.color}">${card.word}</div>`}
        ).join("");        
    }


}