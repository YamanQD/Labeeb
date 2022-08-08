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
		await this.mailService.sendPlainMessage(
			user.email,
			'Welcome to Labeeb',
			`
			Hello, ${user.username}!
			A new Labeeb account has been created for you using this email.
			You can login to the system using this email, and the password provided for you by your administrator.
			Thank you for using Labeeb!

			Note: If you did not request this account, you can safely ignore this email.
			`,
		);
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
