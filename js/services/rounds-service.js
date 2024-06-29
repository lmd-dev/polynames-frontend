import { config } from "../config/config.js";
import { Round } from "../models/round.js";

class RoundsService
{
    async findAll(gameCode)
    {
        const response = await fetch(`${ config.baseUrl }/games/${ gameCode }/rounds`);

        if (response.status === 200)
        {
            const roundsData = await response.json();

            return roundsData.map((roundData) => { return new Round(roundData); });
        }

        return [];
    }
}

export const roundsService = new RoundsService();