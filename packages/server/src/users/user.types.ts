import { Role } from '@labeeb/core';

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
