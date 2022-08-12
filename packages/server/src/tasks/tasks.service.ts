import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';

import { Priority } from '@labeeb/core';

import { List } from 'src/lists/list.entity';
import { Status } from 'src/projects/status.entity';
import { Tag } from 'src/projects/tags.entity';
import { User } from 'src/users/user.entity';
import { MailService } from 'src/mail.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,
		@InjectRepository(List)
		private readonly listRepository: Repository<List>,
		@InjectRepository(Status)
		private readonly statusRepository: Repository<Status>,
		@InjectRepository(Tag)
		private readonly tagRepository: Repository<Tag>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private mailService: MailService,
	) {}

	async isProjectUser(taskId: number, userId: number): Promise<boolean> {
		const task = await this.taskRepository.findOne({
			where: { id: taskId },
			relations: ['list', 'list.project', 'list.project.users'],
		});
		if (!task) {
			throw new NotFoundException(['Task not found']);
		}

		return task.list?.project?.users?.some(({ id }) => id === userId);
	}

	async findAll(): Promise<Task[]> {
		return await this.taskRepository.find();
	}

	async findOne(id: number): Promise<Task> {
		const task = await this.taskRepository.findOne({
			where: { id },
			relations: ['list', 'list.project'],
		});
		if (!task) {
			throw new NotFoundException(['Task not found']);
		}
		return task;
	}

	async create(body: CreateTaskDto, userId: number, isSeeding = false): Promise<Task> {
		const list = await this.listRepository.findOne({
			where: { id: body.listId },
			relations: ['project', 'project.users'],
		});
		if (!list) {
			throw new NotFoundException(['List not found']);
		}
		if (!isSeeding && !list.project?.users?.some(({ id }) => id === userId)) {
			throw new ForbiddenException();
		}

		const owner = await this.userRepository.findOne({
			where: { id: userId },
		});

		const status = await this.statusRepository.findOne({
			where: { title: body.status, project: list.project },
		});
		if (!status) {
			throw new NotFoundException(['Status not found, please add status to project first']);
		}

		const tags: Tag[] = [];
		if (body.tags) {
			for (const tag of body.tags) {
				const tagEntity = await this.tagRepository.findOne({ where: { title: tag } });
				if (!tagEntity) {
					throw new NotFoundException(['Tag not found, please add tag to project first']);
				}
				tags.push(tagEntity);
			}
		}

		const assignees: User[] = [];

		if (body.assignees) {
			for (const assignee of body.assignees) {
				const userEntity = await this.userRepository.findOne({
					where: { id: assignee },
					relations: ['projects'],
				});

				if (!userEntity) {
					throw new NotFoundException(['Assignee not found']);
				}
				if (userEntity.projects.filter((p) => p.id === list.project.id).length === 0) {
					throw new NotFoundException(['Assignee not found in project users']);
				}

				assignees.push(userEntity);
			}
		}

		const task = this.taskRepository.create({
			createdAt: new Date(),
			owner: owner,
			list: list,
			status: status,
			tags: tags,
			assignees: assignees,
			deadline: body.deadline,
			priority: body.priority,
			title: body.title,
			description: body.description,
		});

		for (const assignee of assignees) {
			this.mailService.sendAssignedNotification(assignee, task);
		}

		return await this.taskRepository.save(task);
	}

	async update(id: number, body: UpdateTaskDto): Promise<Task> {
		const task = await this.taskRepository.findOne({
			where: { id },
			relations: ['list', 'list.project'],
		});
		if (!task) {
			throw new NotFoundException(['Task not found']);
		}

		let list: List | undefined;
		if (body.listId) {
			list = await this.listRepository.findOne({
				where: { id: body.listId },
				relations: ['project'],
			});
			if (!list) {
				throw new NotFoundException(['List not found']);
			}
		}

		let status: Status | undefined;
		if (body.status) {
			status = await this.statusRepository.findOne({
				where: {
					title: body.status,
					project: list?.project ?? task.list.project,
				},
			});
			if (!status) {
				throw new NotFoundException([
					'Status not found, please add status to project first',
				]);
			}
		}

		const tags: Tag[] = [];
		if (body.tags) {
			for (const tag of body.tags) {
				const tagEntity = await this.tagRepository.findOne({ where: { title: tag } });
				if (!tagEntity) {
					throw new NotFoundException(['Tag not found, please add tag to project first']);
				}
				tags.push(tagEntity);
			}
		}

		const assignees: User[] = [];
		const newAssignees: User[] = [];
		if (body.assignees) {
			for (const assignee of body.assignees) {
				const userEntity = await this.userRepository.findOne({
					where: { id: assignee },
					relations: ['projects'],
				});

				if (!userEntity) {
					throw new NotFoundException(['Assignee not found']);
				}
				if (userEntity.projects.filter((p) => p.id === task.list.project.id).length === 0) {
					throw new NotFoundException(['Assignee not found in project users']);
				}

				assignees.push(userEntity);
				if (!task.assignees.find((a) => a.id == userEntity.id)) {
					newAssignees.push(userEntity);
				}
			}
		}

		task.title = body.title ?? task.title;
		task.description = body.description ?? task.description;
		task.priority = body.priority ?? task.priority;
		task.deadline = body.deadline ?? task.deadline;
		task.list = body.listId ? list : task.list;
		task.status = body.status ? status : task.status;
		task.tags = body.tags ? tags : task.tags;
		task.assignees = body.assignees ? assignees : task.assignees;

		for (const assignee of newAssignees) {
			await this.mailService.sendAssignedNotification(assignee, task);
		}

		return await this.taskRepository.save(task);
	}

	async delete(id: number): Promise<void> {
		const task = await this.taskRepository.findOne({ where: { id } });
		if (!task) {
			throw new NotFoundException(['Task not found']);
		}
		await this.taskRepository.remove(task);
		return;
	}

	async seed() {
		const priorities = [Priority.HIGH, Priority.MEDIUM, Priority.LOW, Priority.NONE];
		const statuses = ['Todo', 'In Progress', 'Done'];
		const tags = [
			'Backend',
			'Frontend',
			'Mobile',
			'Web',
			'Database',
			'Devops',
			'Testing',
			'Design',
			'Other',
		];

		const allTasks = await this.taskRepository.find();
		if (allTasks.length > 0) return;

		for (let i = 0; i < 20; i++) {
			const task: CreateTaskDto = {
				title: faker.random.words(),
				description: faker.random.words(10),
				priority: priorities[Math.floor(Math.random() * 100) % priorities.length],
				deadline: faker.date.future(),
				listId: (Math.floor(Math.random() * 10) % 3) + 1,
				status: statuses[Math.floor((Math.random() * 10) % 3)],
				tags: [
					tags[Math.floor((Math.random() * 10) % 9)],
					tags[Math.floor((Math.random() * 10) % 9)],
				],
			};
			await this.create(task, (Math.floor(Math.random() * 10) % 3) + 1, true);
		}
	}
}
