import { Card } from "./card.js";
import { Round } from "./round.js";

export class Rounds
{
    /** @type { Round[] } */
    #rounds

    constructor()
    {
        this.#rounds = [];
    }

    setRound(round)
    {
        const index = this.#rounds.findIndex((r) => { return r.id === round.id; });

        if(index !== -1)
            this.#rounds[index] = round;
        else
            this.#rounds.push(round);
    }

    setRounds(rounds)
    {
        this.#rounds = [...rounds];
    }

    isClueDefined()
    {
        return this.#getLastRound()?.isClueDefined() ?? false;
    }

    /**
     * 
     * @param {Card} card 
     */
    revealCard(card)
    {
        this.#getLastRound()?.revealCard(card);
    }

    all()
    {
        return this.#rounds;
    }

    getScore()
    {
        let score = 0;

        for(const round of this.#rounds)
            score += round.score;
        
        return score;
    }

    #getLastRound()
    {
        return (this.#rounds.length ? this.#rounds[this.#rounds.length - 1] : null);
    }
}