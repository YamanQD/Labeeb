import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>
	) { }

	async findProjectTasks(id: number): Promise<any> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['lists', 'lists.tasks'],
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return project;
	}

	async create(project: Project): Promise<Project> {
		return await this.projectRepository.save(project);
	}
}
