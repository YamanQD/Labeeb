import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Task } from 'src/tasks/task.entity';
import { CreateListDto } from './dto/create-list-dto';
import { List } from './list.entity';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
	constructor(private readonly listsService: ListsService) { }

	@Get(':id')
	async findListTasks(@Param('id') id: number): Promise<Task[]> {
		return await this.listsService.findListTasks(id);
	}

	@Post()
	async create(@Body() body: CreateListDto): Promise<List> {
		return await this.listsService.create(body);
	}
}
