import { config } from "../config/config.js";
import { Card } from "../models/card.js";

class CardsService
{
    /**
     * 
     * @param {string} gameCode 
     * @param {string} playerUId 
     * @returns { Card[] } 
     */
    async findAll(gameCode, playerUId)
    {
        const response = await fetch(`${ config.baseUrl }/games/${ gameCode }/cards/${playerUId}`);

        if (response.status === 200)
        {
            const cardsData = await response.json();

            return cardsData.map((cardData) => { return new Card(cardData); });
        }

        return [];
    }
}

export const cardsService = new CardsService();