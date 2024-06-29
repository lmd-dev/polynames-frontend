import { Role } from "./role.js";

/**
 * @typedef { Object } PlayerData
 * @property { number } id
 * @property { string } name
 * @property { RoleData | null } role
 */


export class Player
{
    /** @type { number } */
    #id
    get id() { return this.#id; }

    /** @type { string } */
    #name
    get name() { return this.#name; }

    /** @type { Role | null } */
    #role

    /**
     * 
     * @param {PlayerData | undefined} data 
     */
    constructor(data)
    {
        this.#id = 0;
        this.#name = "";
        this.#role = null;

        if(data)
            this.fromData(data);
    }

    /**
     * 
     * @param {PlayerData} data 
     */
    fromData(data)
    {
        this.#id = data.id ?? 0;
        this.#name = data.name ?? "";
        this.#role = data.role ? new Role(data.role) : null;
    }

    /**
     * 
     * @returns { boolean }
     */
    hasRole()
    {
        return this.#role !== null
    }

    /**
     * 
     * @returns { boolean }
     */
    canSeeCardsColor()
    {
        return this.#role?.canSeeCardColor === true ?? false;
    }
}