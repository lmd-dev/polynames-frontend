import { gameController } from "../controller/game-controller.js";
import { roleController } from "../controller/role-controller.js";
import template from "../templates/choose-role-template.js";
import { View } from "./view.js";

export class RoleView extends View
{
    constructor()
    {
        super(template);

        roleController.addEventListener("update", () => { this.#updateRolesList(); })
    }

    initialize()
    {
        this.#updateRolesList();
        this.#attachEvents();
    }

    #updateRolesList()
    {
        const list = document.querySelector("#selected-role");
        if (list)
        {
            list.innerHTML = "";

            for (const role of roleController.roles)
            {
                list.innerHTML += `<option value="${ role.id }">${ role.name }</option>`;
            }
        }
    }

    #attachEvents()
    {
        document.getElementById("select-role")?.addEventListener("click", () =>
        {
            const select = document.getElementById("selected-role");

            if (select)
            {
                gameController.chooseRole(parseInt(select.value))
            }
        });
    }
}