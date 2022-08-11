import { Role } from "@labeeb/core";

export const permissions = {
    ALL_USERS: [Role.EMPLOYEE, Role.PM, Role.OM, Role.SO],
    ADMINS_ONLY: [Role.PM, Role.OM, Role.SO],
    ADMINS_ABOVE_PM: [Role.OM, Role.SO]
};