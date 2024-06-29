import { config } from "../config/config.js";
import { Player } from "../models/player.js";

class PlayersService
{
    /**
     * Loads player from its id
     * @param {string} playerUId UId of the player to load 
     * @returns {Promise<Player | null>}
     */
    async find(playerUId)
    {
        const response = await fetch(`${config.baseUrl}/players/${playerUId}`);

        if (response.status === 200)
        {
            return new Player(await response.json());
        }

        return null;
    }

    /**
     * Loads players registered on the given game
     * @param {string} gameCode 
     * @returns { Promise<Player[]> } List of Players
     */
    async findAll(gameCode)
    {
        const response = await fetch(`${config.baseUrl}/games/${gameCode}/players`);

        if (response.status === 200)
        {
            const playersData = await response.json();

            return playersData.map((data) => { return new Player(data); });
        }

        return [];
    }

    /**
     * 
     * @param {string} gameCode 
     * @param {string} playerUId 
     * @returns 
     */
    async leaveGame(gameCode, playerUId)
    {
        const response = await fetch(`${config.baseUrl}/games/${gameCode}/players/${playerUId}`, { method: "delete" });

        if (response.status === 200)
        {
            return true;
        }

        return false;
    }
}

export const playersService = new PlayersService();