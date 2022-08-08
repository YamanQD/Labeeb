import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { UpdateUserDto } from './dto/update-user-dto';
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

	@Get('/:id')
	async findOne(@Param('id') id: number): Promise<User> {
		return await this.usersService.findById(id);
	}

	@Patch('/:id')
	async update(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<User> {
		return await this.usersService.update(id, body);
	}

	@Delete('/:id')
	@HttpCode(HttpStatus.ACCEPTED)
	async delete(@Param('id') id: number): Promise<void> {
		await this.usersService.delete(id);
	}
}
