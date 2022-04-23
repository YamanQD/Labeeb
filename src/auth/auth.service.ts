import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
	) { }

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.usersService.findOne(username);
		if (user && user.password === password) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async register(user: User) {
		return this.usersService.create(user);
	}
}