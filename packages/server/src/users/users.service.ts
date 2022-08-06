import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@labeeb/core';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) { }

	async create(user: User) {
		const newUser = this.usersRepository.create(user);
		return await this.usersRepository.save(newUser);
	}

	async findOne(username: string) {
		return await this.usersRepository.findOne({ where: { username } });
	}

	async seed() {
		const allUsers = await this.usersRepository.find();
		if (allUsers.length > 0) return;

		const users = [
			{
				username: 'admin',
				password: 'admin',
				email: 'admin@example.com',
				role: Role.ADMIN,
			},
			{
				username: 'Yaman',
				password: 'Yaman',
				email: 'yaman@example.com',
				role: Role.USER,
			},
			{
				username: 'Hasan',
				password: 'Hasan',
				email: 'hasan@example.com',
				role: Role.USER,
			},
			{
				username: 'rami',
				password: 'rami',
				email: 'rami@labeeb.com',
				role: Role.USER,
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
