import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get('')
	async index(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
	): Promise<Pagination<User>> {
		limit = limit > 100 ? 100 : limit;
		return this.usersService.paginate({
			page,
			limit,
			route: '/users',
		});
	}
}
