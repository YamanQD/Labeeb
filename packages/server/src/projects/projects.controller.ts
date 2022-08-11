import { Role } from '@labeeb/core';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { UserWithoutPassword } from 'src/users/user.types';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { Status } from './status.entity';
import { Tag } from './tags.entity';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) { }

	@Roles(Role.SO, Role.OM)
	@Get()
	async findAll(): Promise<any> {
		return await this.projectsService.findAll();
	}

	@Get(':id/tasks')
	async findProjectTasks(@Param('id') id: number): Promise<Project> {
		return await this.projectsService.findProjectTasks(id);
	}

	@Get(':id/statuses')
	async findProjectStatuses(@Param('id') id: number): Promise<Status[]> {
		return await this.projectsService.findProjectStatuses(id);
	}

	@Get(':id/tags')
	async findProjectTags(@Param('id') id: number): Promise<Tag[]> {
		return await this.projectsService.findProjectTags(id);
	}

	@Get(':id/users')
	async findProjectUsers(@Param('id') id: number): Promise<UserWithoutPassword[]> {
		return await this.projectsService.findProjectUsers(id);
	}

	@Roles(Role.SO, Role.OM)
	@Post()
	async create(@Body() body: CreateProjectDto): Promise<Project> {
		return await this.projectsService.create(body);
	}

	@Roles(Role.SO, Role.OM, Role.PM)
	@Patch(':id')
	async update(@Param('id') id: number, @Body() body: UpdateProjectDto): Promise<Project> {
		return await this.projectsService.update(id, body);
	}

	@Roles(Role.SO, Role.OM)
	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	async delete(@Param('id') id: number): Promise<void> {
		return await this.projectsService.delete(id);
	}

	@Roles(Role.SO, Role.OM, Role.PM)
	@Post(':id/statuses')
	@HttpCode(HttpStatus.CREATED)
	async addStatus(@Param('id') id: number, @Body() body: { title: string }): Promise<void> {
		return await this.projectsService.addStatus(id, body.title);
	}

	@Roles(Role.SO, Role.OM, Role.PM)
	@Delete(':id/statuses/:title')
	@HttpCode(HttpStatus.NO_CONTENT)
	async removeStatus(@Param('id') id: number, @Param('title') title: string) {
		return await this.projectsService.removeStatus(id, title);
	}

	@Roles(Role.SO, Role.OM, Role.PM)
	@Post(':id/tags')
	@HttpCode(HttpStatus.CREATED)
	async addTag(@Param('id') id: number, @Body() body: { title: string }): Promise<void> {
		return await this.projectsService.addTag(id, body.title);
	}

	@Roles(Role.SO, Role.OM, Role.PM)
	@Delete(':id/tags/:title')
	@HttpCode(HttpStatus.NO_CONTENT)
	async removeTag(@Param('id') id: number, @Param('title') title: string) {
		return await this.projectsService.removeTag(id, title);
	}
}
