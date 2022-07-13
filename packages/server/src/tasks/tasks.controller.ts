import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Request,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

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
	async create(@Request() req, @Body() body: CreateTaskDto): Promise<Task> {
		return await this.tasksService.create(body, req.user.id);
	}

	@Patch(':id')
	async update(@Param('id') id, @Body() body: UpdateTaskDto): Promise<Task> {
		return await this.tasksService.update(id, body);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param('id') id): Promise<void> {
		return await this.tasksService.delete(id);
	}
}
