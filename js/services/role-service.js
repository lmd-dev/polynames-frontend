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
     * @param {string} playerUId 
     * @param {number} roleId 
     * @returns { Promise<boolean> }
     */
    async chooseRole(playerUId, roleId)
    {
        const response = await fetch(`${ config.baseUrl }/roles/${ playerUId }`, {
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

    /**
     * 
     * @param {string} playerUId 
     * @returns { Role | null }
     */
    async findForPlayer(playerUId)
    {
        const response = await fetch(`${ config.baseUrl }/roles/${ playerUId }`);

        if (response.status === 200)
        {
            return new Role(response.json());
        }

        return null;
    }
}

export const roleService = new RoleService();