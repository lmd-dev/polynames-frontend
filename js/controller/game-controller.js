import { gameService } from "../services/game-service.js";
import { roleService } from "../services/role-service.js";
import { storageService } from "../services/storage-service.js";
import { playersService } from "../services/players-service.js";
import { roundsService } from "../services/rounds-service.js";
import { cardsService } from "../services/cards-service.js";
import { sseService } from "../services/sse-service.js";
import { Player } from "../models/player.js";
import { Round } from "../models/round.js";
import { Card } from "../models/card.js";
import { Game } from "../models/game.js";

class GameController extends EventTarget
{
    /** @type { Game | null } */
    #game;
    get game() { return this.#game; }

    constructor()
    {
        super();

        this.#game = null;
    }

    async start()
    {
        this.#initializeSSEEvents();
        this.#loadGame();
    }

    #initializeSSEEvents()
    {
        sseService.addEventListener("join-game", (event) => { this.#onPlayersChange(event.detail ?? []); });
        sseService.addEventListener("leave-game", (event) => { this.#onPlayersChange(event.detail ?? []); });
        sseService.addEventListener("role", (event) => { this.#onPlayersChange(event.detail ?? []); });
        sseService.addEventListener("clue", (event) => { this.#onRoundChange(event.detail ?? null); });
        sseService.addEventListener("new-round", (event) => { this.#onRoundChange(event.detail ?? null); });
        sseService.addEventListener("score", (event) => { this.#onRoundChange(event.detail ?? null); });
        sseService.addEventListener("reveal", (event) => { this.#onRevealCard(event.detail ?? null); });
        sseService.addEventListener("lost-game", (event) => { this.#onLose(event.detail ?? null); });
        sseService.addEventListener("won-game", (event) => { this.#onWin(event.detail ?? null); });
    }

    #saveGame()
    {
        if (this.#game && this.#game.players.localPlayer)
        {
            storageService.saveGameData({
                gameCode: this.#game.code,
                playerUId: this.#game.players.localPlayer.uid
            });
        }
    }

    async #loadGame()
    {
        const data = storageService.loadGameData();

        if (data)
        {
            const game = await gameService.find(data.gameCode);
            const player = await playersService.find(data.playerUId);

            if (game === null || player === null)
            {
                storageService.clearGameData();
                return;
            }

            this.#game = new Game(data.gameCode);
            this.#game.players.setLocalPlayer(player);

            this.#subscribeToGame();

            await this.#loadPlayers();
            await this.#loadRounds();
            await this.#loadCards();
        }

        this.#notify("update");
    }

    /**
     * Loads the list of players registered for the given game
     */
    async #loadPlayers()
    {
        if (this.#game)
            this.#game.players.setPlayers(await playersService.findAll(this.#game.code));
    }

    /**
     * Loads the list of rounds attached to the given game
     */
    async #loadRounds()
    {
        if (this.#game)
        {
            this.#game.setRounds(await roundsService.findAll(this.#game.code));

            this.#notify("rounds-update");
        }
    }

    /**
     * Loads the list of cards attached to the given game
     */
    async #loadCards()
    {
        if (this.#game)
        {
            this.#game.setCards(await cardsService.findAll(this.#game.code, this.#game.players.localPlayer?.uid));

            this.#notify("cards-update");
        }
    }

    isGameJoined()
    {
        return this.#game !== null;
    }

    /**
     * Creates a new game
     * @param {string} playerName 
     */
    async createGame(playerName)
    {
        this.#game = await gameService.createGame();
        if (this.#game !== null)
        {
            await this.joinGame(this.#game.code, playerName);
        }
    }

    /**
     * @param {string} gameCode 
     * @param {string} playerName 
     */
    async joinGame(gameCode, playerName)
    {
        if (this.#game === null)
            this.#game = new Game(gameCode);

        this.#subscribeToGame();

        const player = await gameService.joinGame(gameCode, playerName);

        if (player)
        {
            this.#game.players.setLocalPlayer(player);

            this.#saveGame();

            this.#notify("update");
        }
    }

    /**
     * Exits the current game
     */
    async exitGame()
    {
        await playersService.leaveGame(this.#game?.code, this.#game.players.localPlayer?.uid ?? 0);

        this.#game = null;
        storageService.clearGameData();

        this.#notify("update");
    }

    /**
     * Choose role for the current player
     * @param {number} roleId 
     */
    async chooseRole(roleId)
    {
        if (this.#game)
        {
            await roleService.chooseRole(this.#game.players.localPlayer?.uid, roleId);
        }

    }

    /**
     * Sends clue to the other player
     * @param {string} clue 
     * @param {number} nbWords 
     */
    async sendClue(clue, nbWords)
    {
        if (this.#game?.canLocalPlayerSendClue())
        {
            await gameService.sendClue(this.#game.code, this.#game.players.localPlayer?.uid, clue, nbWords);
        }
    }

    /**
     * Reveals card color
     * @param {number} cardId 
     */
    async revealCard(cardId)
    {
        if (this.#game?.canLocalPlayerRevealCard())
        {
            await gameService.revealCard(this.#game.code, this.#game.players.localPlayer?.uid, cardId);
        }
    }


    /**
     * Terminates the current round
     */
    async finishRound()
    {
        if (this.#game?.canLocalPlayerRevealCard())
            await gameService.finishRound(this.#game.code, this.#game.players.localPlayer?.uid);
    }

    /**
     * Sets the players attached to the current game
     * @param {PlayerData[]} players 
     */
    #onPlayersChange(players)
    {
        if (this.#game)
        {
            this.#game.players.setPlayers(players.map((playerData) => { return new Player(playerData); }));
            this.#notify("update");

            if (this.#game.players.localPlayer?.hasRole())
            {
                this.#saveGame();
                this.#loadCards();
            }
        }
    }

    /**
     * Updates the current round
     * @param {RoundData} round 
     */
    #onRoundChange(roundData)
    {
        if (this.#game === null || roundData === null)
            return;

        this.#game.rounds.setRound(new Round(roundData));

        this.#notify("rounds-update");
    }

    /**
     * 
     * @param {CardData} cardData 
     */
    #onRevealCard(cardData)
    {
        if (this.#game === null || cardData === null)
            return;

        this.#game.revealCard(new Card(cardData));
        this.#notify("cards-update");
    }

    #onWin(cards)
    {
        if (this.#game)
        {
            this.#game.setCards(cards);
            this.#game.win();
            storageService.clearGameData();

            this.#notify("cards-update");
            this.#notify("update");
        }
    }

    #onLose(cards)
    {
        console.log(cards);

        if (this.#game)
        {
            this.#game.setCards(cards);
            this.#game.lose();
            storageService.clearGameData();

            this.#notify("cards-update");
            this.#notify("update");
        }
    }



    #subscribeToGame()
    {
        if (this.#game)
            sseService.subscribeToGameChannel(this.#game.code);
    }

    /**
     * Sends an event to listeners
     * @param {string} eventType 
     */
    #notify(eventType)
    {
        this.dispatchEvent(new Event(eventType));
    }
}

export const gameController = new GameController();