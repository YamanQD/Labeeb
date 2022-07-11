import { Body, Controller, Post } from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
	constructor(private readonly projectsService: ProjectsService) { }

	@Post()
	async create(@Body() body: any): Promise<Project> {
		return await this.projectsService.create(body);
	}
}
