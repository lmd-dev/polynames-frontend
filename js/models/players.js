import { Player } from "./player.js";

export class Players
{
    /** @type {Player | null } */
    #localPlayer;
    get localPlayer() { return this.#localPlayer; }

    /** @type {Player[] } */
    #players;

    get remotePlayer()
    {
        for (const player of this.#players)
        {
            if (player.id !== this.#localPlayer?.id)
                return player;
        }

        return null;
    }

    constructor()
    {
        this.#localPlayer = null;
        this.#players = [];
    }

    /**
     * 
     * @param {Player} player 
     */
    setLocalPlayer(player)
    {
        this.#localPlayer = player;
    }

    /**
     * 
     * @param {Player[]} players 
     */
    setPlayers(players)
    {
        this.#players = [...players];

        for (const player of this.#players)
        {
            if(player.id === this.#localPlayer?.id)
                this.#localPlayer = player;
        }
    }
}