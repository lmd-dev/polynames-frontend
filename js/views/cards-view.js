import { View } from "./view.js";
import template from "../templates/cards-template.js";
import { gameController } from "../controller/game-controller.js";

export class CardsView extends View
{
    constructor()
    {
        super(template);

        gameController.addEventListener("cards-update", () => { this.#notify(); });
    }

    initialize()
    {
        this.#updateCards();
        this.#attachEvents();
    }

    #notify()
    {
        this.#updateCards();
        this.#attachEvents();
    }

    #updateCards()
    {
        const list = document.querySelector(".cards-view");
        list.innerHTML = "";

        for (const card of gameController.game.cards)
        {
            list.innerHTML += `
                <div class="card ${ card.color } ${card.revealed ? "revealed" : ""}" data-id="${ card.id }">
                    <div class="card-word">${ card.word }</div>
                </div>
            `
        }
    }

    #attachEvents()
    {
        const cards = document.querySelectorAll(".card");

        for (const card of cards)
        {
            card.addEventListener("click", () =>
            {
                gameController.revealCard(card.dataset.id);
            })
        }
    }
}