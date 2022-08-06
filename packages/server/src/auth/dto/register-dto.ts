import { Role } from '@labeeb/core';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	password: string;

	@IsOptional()
	@IsEnum(Role, {
		message: 'role should be one of (organization manager, project manager, employee)',
	})
	role?: Role;
}