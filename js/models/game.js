import { Card } from "./card.js";
import { Players } from "./players.js";
import { Round } from "./round.js";
import { Rounds } from "./rounds.js";

export const GameStatus = {
    IN_PROGRESS: "in-progress",
    WON: "won",
    LOST: "lost"
}

export class Game
{
    /** @type { string } */
    #code
    get code() { return this.#code; }

    /** @type { Players } */
    #players
    get players() { return this.#players; }

    /** @type { Rounds } */
    #rounds
    get rounds() { return this.#rounds; }

    /** @type {Card[] } */
    #cards
    get cards() { return this.#cards; }

    #status
    get status() { return this.#status; }

    /**
     * 
     * @param {string} code 
     */
    constructor(code)
    {
        this.#code = code;
        this.#players = new Players();
        this.#rounds = new Rounds();
        this.#cards = [];
        this.#status = GameStatus.IN_PROGRESS;
    }

    /**
     * 
     * @param {Round[]} rounds 
     */
    setRounds(rounds)
    {
        this.#rounds.setRounds(rounds);
    }

    /**
     * 
     * @param {Card[]} cards 
     */
    setCards(cards)
    {
        this.#cards = [...cards];
    }

    canLocalPlayerSeeCardsColor()
    {
        return this.#players.localPlayer?.canSeeCardsColor() ?? false;
    }

    /**
     * 
     * @returns { boolean }
     */
    canLocalPlayerRevealCard()
    {
        return this.#players.localPlayer?.canSeeCardsColor() === false && this.#rounds.isClueDefined();
    }

    /**
     * 
     * @returns { boolean }
     */
    canLocalPlayerSendClue()
    {
        return this.#players.localPlayer?.canSeeCardsColor() === true && this.#rounds.isClueDefined() === false;
    }

    /**
     * 
     * @param {Card} cardToReveal 
     */
    revealCard(cardToReveal)
    {
        const card = this.#cards.find((c) => { return c.id === cardToReveal.id });

        if (card)
        {
            card.revealed = true;
            card.color = cardToReveal.color;

            this.#rounds.revealCard(card);
        }
    }

    getScore()
    {
        if(this.#status === GameStatus.LOST)
            return 0;

        return this.rounds.getScore();
    }

    win()
    {
        this.#status = GameStatus.WON;
    }

    lose()
    {
        this.#status = GameStatus.LOST;
    }
}