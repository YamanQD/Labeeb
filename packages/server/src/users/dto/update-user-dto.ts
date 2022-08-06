import { Role } from '@labeeb/core';
import { IsEmail, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	username: string;

	@IsOptional()
	@IsEmail()
	email: string;

	@IsOptional()
	oldPassword: string;

	@IsOptional()
	newPassword: string;

	@IsOptional()
	@IsEnum(Role, {
		message: 'role should be one of (organization manager, project manager, employee)',
	})
	role?: Role;
}