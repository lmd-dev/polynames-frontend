import { config } from "../config/config.js";
import { Role } from "../models/role.js";

class RoleService
{
    /**
     * @returns { Promise<Role[]> }
     */
    async findAll()
    {
        try
        {
            const response = await fetch(`${ config.baseUrl }/roles`);

            if (response.status === 200)
            {
                const rolesData = await response.json();

                return rolesData.map((roleData) => { return new Role(roleData); });
            }
        }
        catch (error)
        {
            console.error(error);
        }

        return [];
    }

    /**
     * 
     * @param {string} gameCode 
     * @param {number} playerId 
     * @param {number} roleId 
     * @returns { Promise<boolean> }
     */
    async chooseRole(playerId, roleId)
    {
        const response = await fetch(`${ config.baseUrl }/roles/${ playerId }`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: roleId })
        });

        if (response.status === 200)
        {
            return true;
        }

        return false;
    }

    async findForPlayer(playerId)
    {
        const response = await fetch(`${ config.baseUrl }/roles/${ playerId }`);

        if (response.status === 200)
        {
            return new Role(response.json());
        }

        return null;
    }
}

export const roleService = new RoleService();