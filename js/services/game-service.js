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
            const playerData = await response.json();

            return new Player({
                id: playerData.id,
                uid: playerData.uid,
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
     * @param {string} playerUId
     * @returns { Promise<Card[]> } 
     */
    async loadCards(playerUId)
    {
        const response = await fetch(`${ config.baseUrl }/cards/${ playerUId }`);

        if (response.status === 200)
        {
            return response.json();
        }

        return [];
    }

    /**
     * 
     * @param {string} gameCode 
     * @param {string} playerUId 
     * @param {string} clue 
     * @param {number} nbWords 
     * @returns 
     */
    async sendClue(gameCode, playerUId, clue, nbWords)
    {
        const response = await fetch(`${ config.baseUrl }/games/${gameCode}/clues/${ playerUId }`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clue: clue, nbWords: nbWords })
        });

        if (response.status === 200)
            return true;

        return false;
    }

    /**
     * 
     * @param {string} gameCode 
     * @param {string} playerUId 
     * @param {number} cardId 
     * @returns 
     */
    async revealCard(gameCode, playerUId, cardId)
    {
        const response = await fetch(`${ config.baseUrl }/games/${gameCode}/cards/${ playerUId }/${ cardId }`, {
            method: "post"
        });

        if (response.status === 200)
            return true;

        return false;
    }

    /**
     * 
     * @param {string} gameCode 
     * @param {string} playerUId 
     * @returns 
     */
    async finishRound(gameCode, playerUId)
    {
        const response = await fetch(`${ config.baseUrl }/games/${gameCode}/rounds/${ playerUId }`, {
            method: "post"
        });

        if (response.status === 200)
            return true;

        return false;
    }
}

export const gameService = new GameService();