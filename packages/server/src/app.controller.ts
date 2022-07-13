import { Controller, Get, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@ApiTags('auth')
	@Get('profile')
	getProfile(@Req() req: Request) {
		return this.appService.getProfile(req.user);
	}
}
