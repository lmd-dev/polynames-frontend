import { roleService } from "../services/role-service.js";

class RoleController extends EventTarget
{
    #roles;
    get roles() { return this.#roles; }

    constructor()
    {
        super();

        this.#loadRoles()
    }

    async #loadRoles()
    {
        this.#roles = await roleService.findAll();

        this.dispatchEvent(new Event("update"));
    }
}

export const roleController = new RoleController();