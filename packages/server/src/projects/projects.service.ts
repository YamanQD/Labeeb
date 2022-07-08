import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>
	) { }


	async create(project: Project): Promise<Project> {
		return await this.projectRepository.save(project);
	}
}
