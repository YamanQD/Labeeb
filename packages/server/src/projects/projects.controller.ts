import { Role } from '@labeeb/core';
import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, HttpStatus, Param, Patch, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/users/user.entity';
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
	private adminRoles = [Role.SO, Role.OM];

	private async checkProjectUser(projectId: number, user: User): Promise<void> {
		if (
			!this.adminRoles.includes(user?.role) &&
			!await this.projectsService.isProjectUser(projectId, user?.id)
		) {
			throw new ForbiddenException();
		}
	}

	constructor(private readonly projectsService: ProjectsService) { }

	@Get()
	async findAll(@Request() req: any): Promise<any> {
		return this.adminRoles.includes(req.user?.role) ?
			await this.projectsService.findAll() :
			await this.projectsService.findAll(req.user?.id);
	}

	@Get('/:id')
	async findOne(@Param('id') id: number, @Request() req: any): Promise<Project> {
		await this.checkProjectUser(id, req.user);
		return await this.projectsService.findOne(id);
	}

	@Get(':id/tasks')
	async findProjectTasks(@Param('id') id: number, @Request() req: any): Promise<Project> {
		await this.checkProjectUser(id, req.user);
		return await this.projectsService.findProjectTasks(id);
	}

	@Get(':id/statuses')
	async findProjectStatuses(@Param('id') id: number, @Request() req: any): Promise<Status[]> {
		await this.checkProjectUser(id, req.user);
		return await this.projectsService.findProjectStatuses(id);
	}

	@Get(':id/tags')
	async findProjectTags(@Param('id') id: number, @Request() req: any): Promise<Tag[]> {
		await this.checkProjectUser(id, req.user);
		return await this.projectsService.findProjectTags(id);
	}

	@Get(':id/users')
	async findProjectUsers(@Param('id') id: number, @Request() req: any): Promise<UserWithoutPassword[]> {
		await this.checkProjectUser(id, req.user);
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
