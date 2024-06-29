import { config } from "../config/config.js";
import { Game } from "../models/game.js";
import { Player } from "../models/player.js";

class GameService
{
    /**
     * @returns { Promise<Game | null> }
     */
    async createGame()
    {
        const response = await fetch(`${ config.baseUrl }/games`, { method: "post" });
        if (response.status === 200)
        {
            const gameCode = await response.text();

            return new Game(gameCode);
        }

        return null;
    }

    /**
     * 
     * @param {string} gameCode 
     * @param {string} playerName 
     * @returns { Promise<Player> }
     */
    async joinGame(gameCode, playerName)
    {
        const response = await fetch(`${ config.baseUrl }/games/${ gameCode }`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: playerName })
        });
        if (response.status === 200)
        {
            const playerId = parseInt(await response.text());

            return new Player({
                id: playerId,
                name: playerName,
                role: null
            });
        }

        return null;
    }

    async find(gameCode)
    {
        const response = await fetch(`${ config.baseUrl }/games/${ gameCode }`);

        if (response.status === 200)
        {
            return await response.json();
        }

        return null;
    }

    /**
     * 
     * @param {number} playerId
     * @returns { Promise<Card[]> } 
     */
    async loadCards(playerId)
    {
        const response = await fetch(`${ config.baseUrl }/cards/${ playerId }`);

        if (response.status === 200)
        {
            return response.json();
        }

        return [];
    }

    async sendClue(gameCode, playerId, clue, nbWords)
    {
        const response = await fetch(`${ config.baseUrl }/games/${gameCode}/clues/${ playerId }`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clue: clue, nbWords: nbWords })
        });

        if (response.status === 200)
            return true;

        return false;
    }

    async revealCard(gameCode, playerId, cardId)
    {
        const response = await fetch(`${ config.baseUrl }/games/${gameCode}/cards/${ playerId }/${ cardId }`, {
            method: "post"
        });

        if (response.status === 200)
            return true;

        return false;
    }

    async finishRound(gameCode, playerId)
    {
        const response = await fetch(`${ config.baseUrl }/games/${gameCode}/rounds/${ playerId }`, {
            method: "post"
        });

        if (response.status === 200)
            return true;

        return false;
    }
}

export const gameService = new GameService();