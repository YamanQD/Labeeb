import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AppService } from './app.service';
import { UserWithoutPassword } from './users/user.types';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	/**
	 * Get the details of the authenticated user.
	 */
	@ApiTags('auth')
	@Get('profile')
	async getProfile(@Req() req: Request): Promise<UserWithoutPassword> {
		return this.appService.getProfile(req.user);
	}
}
