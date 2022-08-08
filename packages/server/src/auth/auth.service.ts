import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail.service';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register-dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private mailService: MailService,
	) { }

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.usersService.findByEmail(email, true);

		if (user && user.password === password) {
			delete user.password;
			return user;
		}

		return null;
	}

	async register(body: RegisterDto) {
		const user = await this.usersService.create(body);
		await this.mailService.sendRegisteredNotification(user);
		return user;
	}

	async login(user: User) {
		const payload = {
			username: user.username,
			sub: user.id,
			role: user.role,
		};
		return { access_token: this.jwtService.sign(payload) };
	}
}
