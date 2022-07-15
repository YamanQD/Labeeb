import { Role } from "src/enums/role.enum";

export class UserWithoutPassword {
	/**
	 * @example "3"
	 */
	id: number;

	/**
	 * @example "Wilson"
	 */
	username: string;

	/**
	 * @example "wilson@example.com"
	 */
	email: string;

	/**
	 * @example "user"
	 */
	role: Role;
};
