import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail.service';
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
		private mailService: MailService,
	) { }

	async isProjectUser(projectId: number, userId: number): Promise<boolean> {
		const project = await this.projectRepository.findOne({
			where: { id: projectId },
			relations: ['users'],
		});
		if (!project) {
			throw new NotFoundException(['Project not found']);
		}

		return project.users.some((u) => u.id === userId);
	}

	async findAll(userId?: number): Promise<any> {
		let projects = await this.projectRepository.find({
			relations: ['lists', 'lists.tasks', 'statuses', 'tags', 'users'],
		});

		if (userId) {
			projects = projects.filter((p) => p.users.some((u) => u.id === userId));
		}

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
			throw new NotFoundException(['Project not found']);
		}

		return project;
	}

	async findProjectStatuses(id: number): Promise<Status[]> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['statuses'],
		});
		if (!project) {
			throw new NotFoundException(['Project not found']);
		}

		return project.statuses;
	}

	async findProjectUsers(id: number): Promise<UserWithoutPassword[]> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['users'],
		});
		if (!project) {
			throw new NotFoundException(['Project not found']);
		}

		return project.users.map((u) => {
			delete u.password;
			return u;
		});
	}

	async findProjectTags(id: number): Promise<Tag[]> {
		const project = await this.projectRepository.findOne({
			where: { id },
			relations: ['tags'],
		});
		if (!project) {
			throw new NotFoundException(['Project not found']);
		}

		return project.tags;
	}

	async create(project: CreateProjectDto): Promise<Project> {
		const statuses: Status[] = [];
		project.statuses?.forEach(async (s) => {
			const status = await this.statusRepository.save(s);
			statuses.push(status);
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

			for (const user of users) {
				await this.mailService.sendProjectNotification(user, newProject);
			}
		}

		return await this.projectRepository.save(newProject);
	}

	async update(id: number, project: UpdateProjectDto): Promise<Project> {
		const updatedProject = await this.projectRepository.findOne({
			where: { id },
			relations: ['users'],
		});
		if (!updatedProject) {
			throw new NotFoundException(['Project not found']);
		}

		let newUsers: User[] = [];
		if (project.userIds && project.userIds.length > 0) {
			const users = await this.userRepository.findBy({ id: In(project.userIds) });

			for (const user of users) {
				if (!updatedProject.users.find((u) => u.id == user.id)) {
					newUsers.push(user);
				}
			}

			updatedProject.users = users;
		}

		if (project.statuses && project.statuses.length > 0) {
			updatedProject.statuses = updatedProject.statuses ?? [];
			for (const status of project.statuses) {
				const statusEntity = await this.statusRepository.findOneBy({ title: status.title, project: { id } });
				statusEntity ?
					updatedProject.statuses.push(statusEntity) :
					updatedProject.statuses.push(await this.statusRepository.save(status));
			}
		}
		if (project.tags && project.tags.length > 0) {
			updatedProject.tags = updatedProject.tags ?? [];
			for (const tag of project.tags) {
				const tagEntity = await this.tagRepository.findOneBy({ title: tag });
				tagEntity ?
					updatedProject.tags.push(tagEntity) :
					updatedProject.tags.push(await this.tagRepository.save({ title: tag }));
			}
		}

		updatedProject.title = project.title ?? updatedProject.title;
		updatedProject.description = project.description ?? updatedProject.description;
		updatedProject.finalStatus = project.finalStatus ?? updatedProject.finalStatus;

		for (const user of newUsers) {
			await this.mailService.sendProjectNotification(user, updatedProject);
		}

		return await this.projectRepository.save(updatedProject);
	}

	async delete(id: number): Promise<void> {
		const project = await this.projectRepository.findOne({ where: { id } });
		if (!project) {
			throw new NotFoundException(['Project not found']);
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
			throw new NotFoundException(['Project not found']);
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
			throw new NotFoundException(['Project not found']);
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
			throw new NotFoundException(['Project not found']);
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
			throw new NotFoundException(['Project not found']);
		}

		project.tags = project.tags.filter((t) => t.title !== tag);
		await this.projectRepository.save(project);

		return;
	}

	async seed() {
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
				statuses: [
					{ title: 'Todo', color: 'c2daff' },
					{ title: 'In Progress', color: 'ffe600' },
					{ title: 'Done', color: '00ff2f' }
				],
				finalStatus: "Done",
				tags: ['Backend', 'Frontend', 'Mobile', 'Web', 'Database', 'Devops', 'Testing', 'Design', 'Other'],
			},
			{
				title: 'E-Commerce App',
				description: 'E-Commerce App for selling products',
				userIds: [3, 6, 1],
				statuses: [
					{ title: 'Todo', color: 'c2daff' },
					{ title: 'In Progress', color: 'ffe600' },
					{ title: 'Done', color: '00ff2f' }
				],
				finalStatus: "Done",
				tags: ['Backend', 'Frontend', 'Mobile', 'Web', 'Database', 'Devops', 'Testing', 'Design', 'Other'],
			},
			{
				title: 'Banking App',
				statuses: [
					{ title: 'Todo', color: 'c2daff' },
					{ title: 'In Progress', color: 'ffe600' },
					{ title: 'Done', color: '00ff2f' }
				],
				finalStatus: "Done",
				tags: ['Backend', 'Frontend', 'Mobile', 'Web', 'Database', 'Devops', 'Testing', 'Design', 'Other'],
			},
		];

		await projects.forEach(async (project) => {
			const statuses: Status[] = [];
			await project.statuses?.forEach(async (s) => {
				const status = await this.statusRepository.save(s);
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
