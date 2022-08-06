import { Role } from "@labeeb/core";

export const permissions = {
    ALL_USERS: [Role.USER, Role.PM, Role.OM, Role.SO],
    ADMINS_ONLY: [Role.PM, Role.OM, Role.SO],
};
