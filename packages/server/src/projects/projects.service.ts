import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UserWithoutPassword } from 'src/users/user.types';
import { In, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './project.entity';
import { Status } from './status.entity';
import { Tag } from './tags.entity';

@Injectable()
export class ProjectsService {
	constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Status)
		private readonly statusRepository: Repository<Status>,
		@InjectRepository(Tag)
		private readonly tagRepository: Repository<Tag>,
	) { }

	async findAll(): Promise<any> {
		const projects = await this.projectRepository.find({
			relations: ['lists', 'lists.tasks', 'statuses', 'tags', 'users'],
		});

		return projects.map((project) => ({
			...project,
			lists: project.lists.map((l) => ({ id: l.id, title: l.title, taskCount: l.tasks.length }))
		}));
	}

	async findProjectTasks(id: number): Promise<Project> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['statuses', 'tags', 'lists', 'lists.tasks', 'lists.tasks.status', 'lists.tasks.tags'],
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return project;
	}

	async findProjectStatuses(id: number): Promise<Status[]> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['statuses'],
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return project.statuses;
	}

	async findProjectUsers(id: number): Promise<UserWithoutPassword[]> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['users'],
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return project.users.map((u) => {
			delete u.password;
			return u;
		});
	}

	async findProjectTags(id: number): Promise<Status[]> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['tags'],
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return project.tags;
	}

	async create(project: CreateProjectDto): Promise<Project> {
		const statuses: Status[] = [];
		project.statuses?.forEach(async (s) => {
			const status = await this.statusRepository.findOneBy({ title: s });
			statuses.push(status ?? (await this.statusRepository.save({ title: s })));
		});

		const tags: Tag[] = [];
		project.tags?.forEach(async (t) => {
			const tag = await this.tagRepository.findOneBy({ title: t });
			tags.push(tag ?? (await this.tagRepository.save({ title: t })));
		});

		// Sleep for a bit to simulate a slow database
		await new Promise((r) => setTimeout(r, 200));

		const newProject = this.projectRepository.create({ ...project, statuses, tags });

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

		if (project.userIds && project.userIds.length > 0) {
			const users = await this.userRepository.findBy({ id: In(project.userIds) });
			updatedProject.users = users;
		}

		updatedProject.title = project.title ?? updatedProject.title;
		updatedProject.finalStatus = project.finalStatus ?? updatedProject.finalStatus;

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

	async addStatus(id: number, status: string): Promise<void> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['statuses'],
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		const newStatus = await this.statusRepository.save({ title: status });

		project.statuses = [...project.statuses, newStatus];
		await this.projectRepository.save(project);

		return;
	}

	async removeStatus(id: number, status: string) {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['statuses'],
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		project.statuses = project.statuses.filter((s) => s.title !== status);
		await this.projectRepository.save(project);

		return;
	}

	async addTag(id: number, tag: string): Promise<void> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['tags'],
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		const newTag = await this.tagRepository.save({ title: tag });

		project.tags = [...project.tags, newTag];
		await this.projectRepository.save(project);

		return;
	}

	async removeTag(id: number, tag: string) {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['tags'],
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		project.tags = project.tags.filter((t) => t.title !== tag);
		await this.projectRepository.save(project);

		return;
	}

	async seed() {
		const allStatuses = await this.statusRepository.find();
		if (allStatuses.length === 0) {
			await this.statusRepository.save([
				{ title: 'Todo' },
				{ title: 'In Progress' },
				{ title: 'Done' },
			]);
		}

		const allTags = await this.tagRepository.find();
		if (allTags.length === 0) {
			await this.tagRepository.save([
				{ title: 'Backend' },
				{ title: 'Frontend' },
				{ title: 'Mobile' },
				{ title: 'Web' },
				{ title: 'Database' },
				{ title: 'Devops' },
				{ title: 'Testing' },
				{ title: 'Design' },
				{ title: 'Other' },
			]);
		}


		await new Promise((r) => setTimeout(r, 200));

		const allProjects = await this.projectRepository.find();
		if (allProjects.length > 0) return;

		const projects: CreateProjectDto[] = [
			{
				title: 'Satellite Simulator',
				userIds: [1, 2],
				statuses: ['Todo', 'In Progress', 'Done'],
				finalStatus: "Done",
				tags: ['Backend', 'Frontend', 'Mobile', 'Web', 'Database', 'Devops', 'Testing', 'Design', 'Other'],
			},
			{
				title: 'E-Commerce App',
				userIds: [3, 6, 1],
				statuses: ['Todo', 'In Progress', 'Done'],
				finalStatus: "Done",
				tags: ['Backend', 'Frontend', 'Mobile', 'Web', 'Database', 'Devops', 'Testing', 'Design', 'Other'],
			},
			{
				title: 'Banking App',
				statuses: ['Todo', 'In Progress', 'Done'],
				finalStatus: "Done",
				tags: ['Backend', 'Frontend', 'Mobile', 'Web', 'Database', 'Devops', 'Testing', 'Design', 'Other'],
			},
		];

		await projects.forEach(async (project) => {
			const statuses: Status[] = [];
			await project.statuses?.forEach(async (s) => {
				const status = await this.statusRepository.findOneBy({ title: s });
				statuses.push(status);
			});

			const tags: Tag[] = [];
			await project.tags?.forEach(async (t) => {
				const tag = await this.tagRepository.findOneBy({ title: t });
				tags.push(tag);
			});

			await new Promise((r) => setTimeout(r, 200));

			const newProject = this.projectRepository.create({ ...project, statuses, tags });
			if (project.userIds && project.userIds.length > 0) {
				const users = await this.userRepository.findBy({ id: In(project.userIds) });
				newProject.users = users;
			}

			return await this.projectRepository.save(newProject);
		});
	}
}
