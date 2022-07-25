import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@labeeb/core';
import { ROLE_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) { }

	canActivate(context: ExecutionContext): boolean {
		const allowedRoles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!allowedRoles) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return allowedRoles.some((role) => user.role == role);
	}
}
