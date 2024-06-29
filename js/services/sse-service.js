import { config } from "../config/config.js";
import { SSEClient } from "../libs/sse-client.js";

class SSEService extends EventTarget
{
    /** @type { SSEClient } */
    #sseClient;

    /** @type {string} */
    #subscribedChannel

    constructor()
    {
        super();

        this.#sseClient = new SSEClient(config.sseBaseUrl);
        this.#sseClient.connect();

        this.#subscribedChannel = "";
    }

    /**
     * Subscribes SSEClient to game channel
     * @param {string} gameCode 
     */
    subscribeToGameChannel(gameCode)
    {
        if (this.#subscribedChannel !== gameCode)
        {
            if (this.#subscribedChannel !== "")
                this.unsubscribeFromGame()

            this.#sseClient.subscribe(gameCode, (event) =>
            {
                this.dispatchEvent(new CustomEvent(event.type, { detail: event.data }));
            });
        }
    }

    unsubscribeFromGame()
    {
        this.#sseClient.unsubscribe(this.#subscribedChannel);
        this.#subscribedChannel = "";
    }

}

export const sseService = new SSEService();