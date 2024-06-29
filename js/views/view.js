export class View
{
    /** @type { string } */
    #template;

    /**
     * @param {string} template 
     */
    constructor(template)
    {
        this.#template = template;
    }

    /**
     * @param {HTMLElement} parent 
     */
    appendTo(parent)
    {
        const div = document.createElement("div");
        div.innerHTML = this.#template;

        parent.appendChild(div.querySelector("div"));

        this.initialize();
    }

    initialize() {};
}