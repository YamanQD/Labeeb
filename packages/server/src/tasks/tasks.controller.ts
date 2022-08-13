import { Role } from '@labeeb/core';
import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
	Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
	private adminRoles = [Role.SO, Role.OM];

	private async checkProjectUser(taskId: number, user: User): Promise<void> {
		if (
			!this.adminRoles.includes(user?.role) &&
			!await this.tasksService.isProjectUser(taskId, user?.id)
		) {
			throw new ForbiddenException();
		}
	}

	constructor(private readonly tasksService: TasksService) { }

	@Roles(Role.SO, Role.OM)
	@Get()
	async findAll(): Promise<Task[]> {
		return await this.tasksService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: number, @Request() req: any): Promise<Task> {
		await this.checkProjectUser(id, req.user);
		return await this.tasksService.findOne(id);
	}

	@Post()
	async create(@Request() req: any, @Body() body: CreateTaskDto): Promise<Task> {
		return await this.tasksService.create(body, req.user?.id, this.adminRoles.includes(req.user?.role));
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() body: UpdateTaskDto, @Request() req: any): Promise<Task> {
		await this.checkProjectUser(id, req.user);
		return await this.tasksService.update(id, body);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param('id') id: number, @Request() req: any): Promise<void> {
		await this.checkProjectUser(id, req.user);
		return await this.tasksService.delete(id);
	}
}
