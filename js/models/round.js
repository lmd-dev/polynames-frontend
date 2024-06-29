import { Card } from "./card.js";

/**
 * @typedef { Object } RoundData
 * @property { number } id
 * @property { string } clue
 * @property { int } nbCardsToFind
 * @property { CardData[] } revealedCards
 * @property { int } score
 */


export class Round
{
    /** @type { number } */
    #id;
    get id() { return this.#id; }

    /** @type { string } */
    #clue;
    get clue() { return this.#clue; }

    /** @type { number } */
    #nbCardsToFind;
    get nbCardsToFind() { return this.#nbCardsToFind; }

    /** @type { Card[] } */
    #revealedCards;
    get revealedCards() { return this.#revealedCards; }

    /** @type { number } */
    #score;
    get score() { return this.#score; }

    /**
     * 
     * @param {RoundData | undefined} data 
     */
    constructor(data)
    {
        this.#id = 0;
        this.#clue = "";
        this.#nbCardsToFind = 0;
        this.#revealedCards = [];
        this.#score = 0;

        if (data)
            this.fromData(data);
    }

    /**
     * 
     * @param {RoundData} data 
     */
    fromData(data)
    {
        this.#id = data.id ?? 0;
        this.#clue = data.clue ?? "";
        this.#nbCardsToFind = data.nbCardsToFind ?? 0;
        this.#revealedCards = data.revealedCards ? data.revealedCards.map((cardData) => { return new Card(cardData); }) : [];
        this.#score = data.score ?? 0;
    }

    isClueDefined()
    {
        return this.clue !== "";
    }

    revealCard(card)
    {
        if (this.#revealedCards.find((c) => { return c.id === card.id }) === undefined)
        {
            this.#revealedCards.push(card);
        }
    }
}