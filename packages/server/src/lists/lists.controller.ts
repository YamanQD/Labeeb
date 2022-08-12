import { Role } from '@labeeb/core';
import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, Patch, Post, Request } from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { CreateListDto } from './dto/create-list-dto';
import { UpdateListDto } from './dto/update-list-dto';
import { List } from './list.entity';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
	private adminRoles = [Role.SO, Role.OM];

	constructor(private readonly listsService: ListsService) { }

	@Roles(Role.SO, Role.OM, Role.PM)
	@Get()
	async findAll(): Promise<List[]> {
		return await this.listsService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: number, @Request() req: any): Promise<List> {
		if (
			!this.adminRoles.includes(req.user?.role) &&
			!await this.listsService.isProjectUser(id, req.user?.id)
		) {
			throw new ForbiddenException();
		}

		return await this.listsService.findOne(id);
	}

	@Roles(Role.SO, Role.OM, Role.PM)
	@Post()
	async create(@Body() body: CreateListDto): Promise<List> {
		return await this.listsService.create(body);
	}

	@Roles(Role.SO, Role.OM, Role.PM)
	@Patch(':id')
	async update(@Param('id') id: number, @Body() body: UpdateListDto): Promise<List> {
		return await this.listsService.update(id, body);
	}

	@Roles(Role.SO, Role.OM, Role.PM)
	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param('id') id: number): Promise<void> {
		return await this.listsService.delete(id);
	}
}
