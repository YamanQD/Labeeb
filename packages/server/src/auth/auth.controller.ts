import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService
	) { }

	@Public()
	@Post('register')
	async register(@Body() user) {
		return this.authService.register(user);
	}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}
}
