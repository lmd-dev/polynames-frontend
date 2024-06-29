/**
 * @typedef { Object } CardData
 * @property { number } id
 * @property { string } word
 * @property { string } color
 * @property { boolean } revealed
 */

export class Card
{
    /** @type { number } */
    #id;
    get id() { return this.#id; }

    /** @type { string } */
    #word;
    get word() { return this.#word; }

    /** @type { string } */
    #color;
    get color() { return this.#color; }
    set color(value) {this.#color = value; }

    /** @type { boolean } */
    #revealed;
    get revealed() { return this.#revealed; }
    set revealed(value) {this.#revealed = value; }

    /**
     * 
     * @param {CardData | undefined} data 
     */
    constructor(data)
    {
        this.#id = 0;
        this.#word = "";
        this.#color = "";
        this.#revealed = false;

        if (data)
            this.fromData(data);
    }

    /**
     * 
     * @param {CardData} data 
     */
    fromData(data)
    {
        this.#id = data.id ?? 0;
        this.#word = data.word ?? "";
        this.#color = data.color ?? "";
        this.#revealed = data.revealed ?? false;
    }
}