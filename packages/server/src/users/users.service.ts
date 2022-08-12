import { faker } from '@faker-js/faker';
import { Role } from '@labeeb/core';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { RegisterDto } from 'src/auth/dto/register-dto';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) { }

	async findAll() {
		return await this.usersRepository.find();
	}

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

	async findById(id: number, withPassword = false) {
		return withPassword
			? await this.usersRepository.findOne({
				where: { id },
				select: ['password', 'username', 'id', 'role'],
			})
			: await this.usersRepository.findOne({ where: { id } });
	}

	async findByUsername(username: string) {
		return await this.usersRepository.findOne({ where: { username } });
	}

	async findByEmail(email: string, withPassword = false) {
		return withPassword
			? await this.usersRepository.findOne({
				where: { email },
				select: ['password', 'username', 'id', 'role'],
			})
			: await this.usersRepository.findOne({ where: { email } });
	}

	async update(id: number, body: UpdateUserDto) {
		const user = await this.findById(id, true);
		if (!user) {
			throw new NotFoundException(['User not found']);
		}

		if (body.username) {
			const foundUser = await this.findByUsername(body.username);
			if (foundUser && foundUser.id != id) {
				console.log(foundUser, id);
				throw new BadRequestException(['Username already exists']);
			}
			user.username = body.username;
		}
		if (body.email) {
			const foundUser = await this.findByEmail(body.email);
			if (foundUser && foundUser.id != id) {
				throw new BadRequestException(['Email already exists']);
			}
			user.email = body.email;
		}
		if (body.newPassword) {
			if (!body.oldPassword) {
				throw new BadRequestException(['Old password is required']);
			}
			if (body.oldPassword !== user.password) {
				throw new BadRequestException(['Old password is incorrect']);
			}
			user.password = body.newPassword;
		}
		user.role = body.role ?? user.role;

		const updatedUser = await this.usersRepository.save(user);
		delete updatedUser.password;
		return updatedUser;
	}

	async delete(id: number) {
		const user = await this.findById(id);
		if (!user) {
			throw new NotFoundException(['User not found']);
		}
		return await this.usersRepository.delete(id);
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

		for (let i = 0; i < 20; i++) {
			users.push({
				username: faker.random.word() + i,
				password: faker.random.word() + i,
				email: `${faker.random.word()}-${i}@gmail.com`,
				role: Role.EMPLOYEE,
			});
		}

		await Promise.all(
			users.map(async (user) => {
				const newUser = new User();
				newUser.username = user.username;
				newUser.password = user.password;
				newUser.email = user.email;
				newUser.role = user.role;

				await this.create(newUser);
			}),
		);
	}
}
