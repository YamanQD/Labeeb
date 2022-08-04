import { Role } from "@labeeb/core";

export const permissions = {
    ALL_USERS: [Role.USER, Role.ADMIN],
    ADMINS_ONLY: [Role.ADMIN],
};
