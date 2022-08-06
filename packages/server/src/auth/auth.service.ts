import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService) { }

	async validateUser(email: string, password: string): Promise<User> {
		const user = await this.usersService.findByEmail(email, true);

		if (user && user.password === password) {
			delete user.password;
			return user;
		}

		return null;
	}

	async register(user: User) {
		return this.usersService.create(user);
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
