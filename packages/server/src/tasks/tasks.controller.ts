import { Controller, Delete, Get, HttpCode, Param, Post, Request } from '@nestjs/common';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) { }

	// Temporary route for testing
	@Get()
	async findAll(): Promise<Task[]> {
		return await this.tasksService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id): Promise<Task> {
		return await this.tasksService.findOne(id);
	}

	@Post()
	async create(@Request() req): Promise<Task> {
		return await this.tasksService.create(req.body, req.user);
	}

	@Delete(':id')
	@HttpCode(204)
	async delete(@Param('id') id): Promise<void> {
		return await this.tasksService.delete(id);
	}
}
