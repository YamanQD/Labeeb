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
	Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	// Temporary route for testing
	@Get()
	async findAll(): Promise<Task[]> {
		return await this.tasksService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<Task> {
		return await this.tasksService.findOne(id);
	}

	@Post()
	async create(@Req() req: Request, @Body() body: CreateTaskDto): Promise<Task> {
		return await this.tasksService.create(body, req.user.id);
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() body: UpdateTaskDto): Promise<Task> {
		return await this.tasksService.update(id, body);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param('id') id: number): Promise<void> {
		return await this.tasksService.delete(id);
	}
}
