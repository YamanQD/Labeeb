import { Body, Controller, Post } from '@nestjs/common';
import { List } from './list.entity';
import { ListsService } from './lists.service';

@Controller('lists')
export class ListsController {
	constructor(private readonly listsService: ListsService) { }

	@Post()
	async create(@Body() body: List): Promise<List> {
		return await this.listsService.create(body);
	}
}
