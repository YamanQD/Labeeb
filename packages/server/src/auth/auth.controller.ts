import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post('register')
	async register(@Body() user: User) {
		return this.authService.register(user);
	}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Req() req: Request) {
		return this.authService.login(req.user);
	}
}
