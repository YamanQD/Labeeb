import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';

@ApiTags('auth')
@ApiSecurity({})
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) { }

	/**
	 * Create a new user.
	 */
	@Public()
	@Post('register')
	async register(@Body() body: RegisterDto) {
		return this.authService.register(body);
	}

	/**
	 * Get an authentication token.
	 */
	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Req() req: Request) {
		return this.authService.login(req.user);
	}
}
