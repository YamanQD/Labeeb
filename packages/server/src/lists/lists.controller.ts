import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { CreateListDto } from './dto/create-list-dto';
import { UpdateListDto } from './dto/update-list-dto';
import { List } from './list.entity';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
	constructor(private readonly listsService: ListsService) { }

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<List> {
		return await this.listsService.findOne(id);
	}

	@Post()
	async create(@Body() body: CreateListDto): Promise<List> {
		return await this.listsService.create(body);
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() body: UpdateListDto): Promise<List> {
		return await this.listsService.update(id, body);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param('id') id: number): Promise<void> {
		return await this.listsService.delete(id);
	}
}
