import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project-dto';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
	) {}

	async findAll(): Promise<Project[]> {
		return await this.projectRepository.find({
			relations: { lists: true },
		});
	}

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

	async create(project: CreateProjectDto): Promise<Project> {
		return await this.projectRepository.save(project);
	}

	async seed() {
		const allProjects = await this.projectRepository.find();
		if (allProjects.length > 0) return;

		const projects: CreateProjectDto[] = [
			{
				name: 'Satellite Simulator',
			},
			{
				name: 'E-Commerce App',
			},
			{
				name: 'Banking App',
			},
		];

		await projects.forEach(async (project) => {
			await this.create(project);
		});
	}
}
