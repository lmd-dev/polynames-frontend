/**
 * @typedef { Object } RoleData
 * @property { number } id
 * @property { string } name 
 * @property { boolean } canSeeCardsColor
 */

export class Role
{
    /** @type { number } */
    #id
    get id() { return this.#id; }

    /** @type { string } */
    #name
    get name() { return this.#name; }

    /** @type { boolean } */
    #canSeeCardColor
    get canSeeCardColor() { return this.#canSeeCardColor; }

    /**
     * 
     * @param {RoleData | undefined} data 
     */
    constructor(data)
    {
        this.#id = 0;
        this.#name = "";
        this.#canSeeCardColor = false;

        if(data)
            this.fromData(data);
    }

    /**
     * 
     * @param {RoleData} data 
     */
    fromData(data)
    {
        this.#id = data.id ?? 0;
        this.#name = data.name ?? "";
        this.#canSeeCardColor = data.canSeeCardsColor ?? false;
    }
}