import { Role } from '@labeeb/core';
import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, Param, ParseBoolPipe, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Roles } from 'src/auth/roles.decorator';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './user.entity';
import { UserWithoutPassword } from './user.types';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Roles(Role.SO, Role.OM)
	@Get()
	async index(
		@Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
		@Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
		@Query('paginate', new ParseBoolPipe()) paginate: boolean = true,
	): Promise<Pagination<User> | UserWithoutPassword[]> {
		limit = limit > 100 ? 100 : limit;

		return paginate ?
			this.usersService.paginate({ page, limit, route: '/users' }) :
			this.usersService.findAll();
	}

	@Roles(Role.SO, Role.OM)
	@Get('/:id')
	async findOne(@Param('id') id: number): Promise<User> {
		return await this.usersService.findById(id);
	}

	@Roles(Role.SO, Role.OM)
	@Patch('/:id')
	async update(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<User> {
		return await this.usersService.update(id, body);
	}

	@Roles(Role.SO, Role.OM)
	@Delete('/:id')
	@HttpCode(HttpStatus.ACCEPTED)
	async delete(@Param('id') id: number): Promise<void> {
		await this.usersService.delete(id);
	}
}
