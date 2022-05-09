import { Controller, Get, Post, Request } from '@nestjs/common';
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

	@Post()
	async create(@Request() req): Promise<Task> {
		return await this.tasksService.create(req.body, req.user);
	}
}
