import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project-dto';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) {}

	@Get()
	async findAll(): Promise<Project[]> {
		return await this.projectsService.findAll();
	}

	@Get(':id/tasks')
	async findProjectTasks(@Param('id') id: number): Promise<any> {
		return await this.projectsService.findProjectTasks(id);
	}

	@Post()
	async create(@Body() body: CreateProjectDto): Promise<Project> {
		return await this.projectsService.create(body);
	}
}
