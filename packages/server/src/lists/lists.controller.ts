import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateListDto } from './dto/create-list-dto';
import { List } from './list.entity';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
	constructor(private readonly listsService: ListsService) {}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<List> {
		return await this.listsService.findOne(id);
	}

	@Post()
	async create(@Body() body: CreateListDto): Promise<List> {
		return await this.listsService.create(body);
	}
}
