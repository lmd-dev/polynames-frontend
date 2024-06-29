import { config } from "../config/config.js";

class StorageService
{
    /**
     * Stores game data
     * @param {StorageData} data 
     */
    saveGameData(data)
    {
        localStorage.setItem(config.storageKey, JSON.stringify(data));
    }

    /**
     * Get stored game data
     * @returns { StorageData }
     */
    loadGameData()
    {
        const json = localStorage.getItem(config.storageKey);
        if (json)
        {
            return JSON.parse(json);
        }

        return null;
    }

    /**
     * Clears stored game data
     */
    clearGameData()
    {
        localStorage.removeItem(config.storageKey);
    }
}

export const storageService = new StorageService();