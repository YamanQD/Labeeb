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

	async findProjectTasks(id: number): Promise<Task[]> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: { tasks: true }
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return project.tasks;
	}

	async create(project: Project): Promise<Project> {
		return await this.projectRepository.save(project);
	}
}
