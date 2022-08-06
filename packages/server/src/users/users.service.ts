import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@labeeb/core';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {
	paginate,
	Pagination,
	IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { RegisterDto } from 'src/auth/dto/register-dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) { }

	async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
		return paginate<User>(this.usersRepository, options);
	}

	async create(user: RegisterDto) {
		if (await this.findByUsername(user.username)) {
			throw new BadRequestException(['Username already exists']);
		}
		if (await this.findByEmail(user.email)) {
			throw new BadRequestException(['Email already exists']);
		}

		return await this.usersRepository.save(user);
	}

	async findByUsername(username: string) {
		return await this.usersRepository.findOne({ where: { username } });
	}

	async findByEmail(email: string, withPassword = false) {
		return withPassword ?
			await this.usersRepository.findOne({ where: { email }, select: ['password', 'username', 'id', 'role'] }) :
			await this.usersRepository.findOne({ where: { email } });
	}

	async seed() {
		const allUsers = await this.usersRepository.find();
		if (allUsers.length > 0) return;

		const users = [
			{
				username: 'admin',
				password: 'admin',
				email: 'admin@example.com',
				role: Role.SO,
			},
			{
				username: 'Yaman',
				password: 'Yaman',
				email: 'yaman@example.com',
				role: Role.EMPLOYEE,
			},
			{
				username: 'Hasan',
				password: 'Hasan',
				email: 'hasan@example.com',
				role: Role.EMPLOYEE,
			},
			{
				username: 'rami',
				password: 'rami',
				email: 'rami@labeeb.com',
				role: Role.EMPLOYEE,
			},
		];

		await users.forEach(async (user) => {
			const newUser = new User();
			newUser.username = user.username;
			newUser.password = user.password;
			newUser.email = user.email;
			newUser.role = user.role;

			await this.create(newUser);
		});
	}
}
