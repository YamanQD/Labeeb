import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './project.entity';
import { Status } from './status.entity';

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Status)
		private readonly statusRepository: Repository<Status>,
	) { }

	async findAll(): Promise<Project[]> {
		return await this.projectRepository.find({
			relations: { lists: true },
		});
	}

	async findProjectTasks(id: number): Promise<any> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['statuses', 'lists', 'lists.tasks'],
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return project;
	}

	async create(project: CreateProjectDto): Promise<Project> {
		const newProject = this.projectRepository.create(project);

		if (project.userIds && project.userIds.length > 0) {
			const users = await this.userRepository.findBy({ id: In(project.userIds) });
			newProject.users = users;
		}

		return await this.projectRepository.save(newProject);
	}

	async update(id: number, project: UpdateProjectDto): Promise<Project> {
		const updatedProject = await this.projectRepository.findOne({
			where: { id },
			relations: ['users'],
		});
		if (!updatedProject) {
			throw new NotFoundException('Project not found');
		}

		if (project.title) {
			updatedProject.title = project.title;
		}

		if (project.userIds && project.userIds.length > 0) {
			const users = await this.userRepository.findBy({ id: In(project.userIds) });
			updatedProject.users = users;
		}

		return await this.projectRepository.save(updatedProject);
	}

	async delete(id: number): Promise<void> {
		const project = await this.projectRepository.findOne({ where: { id } });
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		await this.projectRepository.remove(project);
		return;
	}

	async addStatus(id: number, status: any): Promise<any> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['statuses'],
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		const newStatus = await this.statusRepository.save(status);

		project.statuses = [...project.statuses, newStatus];
		await this.projectRepository.save(project);

		return;
	}

	async seed() {
		const allProjects = await this.projectRepository.find();
		if (allProjects.length > 0) return;

		const projects: CreateProjectDto[] = [
			{
				title: 'Satellite Simulator',
				userIds: [1, 2],
			},
			{
				title: 'E-Commerce App',
				userIds: [3, 6, 1],
			},
			{
				title: 'Banking App',
			},
		];

		await projects.forEach(async (project) => {
			await this.create(project);
		});
	}
}
