import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { List } from 'src/lists/list.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { Priority } from 'src/enums/priority.enum';
import { Status } from 'src/projects/status.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,
		@InjectRepository(List)
		private readonly listRepository: Repository<List>,
		@InjectRepository(Status)
		private readonly statusRepository: Repository<Status>,
	) { }

	async findAll(): Promise<Task[]> {
		return await this.taskRepository.find();
	}

	async findOne(id: number): Promise<Task> {
		const task = await this.taskRepository.findOne({ where: { id }, relations: ['list', 'list.project'] });
		if (!task) {
			throw new NotFoundException('Task not found');
		}
		return task;
	}

	async create(body: CreateTaskDto, userId: number): Promise<Task> {
		const list = await this.listRepository.findOne({
			where: { id: body.listId },
		});
		if (!list) {
			throw new NotFoundException('List not found');
		}

		const status = await this.statusRepository.findOne({ where: { title: body.status } });
		if (!status) {
			throw new NotFoundException('Status not found, please add status to project first');
		}

		const task = this.taskRepository.create({
			created_by: userId,
			createdAt: new Date(),
			list: list,
			status: status,
			deadline: body.deadline,
			priority: body.priority,
			title: body.title,
			description: body.description
		});

		return await this.taskRepository.save(task);
	}

	async update(id: number, body: UpdateTaskDto): Promise<Task> {
		const task = await this.taskRepository.findOne({ where: { id } });
		if (!task) {
			throw new NotFoundException('Task not found');
		}

		let list: List | undefined;
		if (body.listId) {
			list = await this.listRepository.findOne({
				where: { id: body.listId },
			});
			if (!list) {
				throw new NotFoundException('List not found');
			}
		}

		let status: Status | undefined;
		if (body.status) {
			status = await this.statusRepository.findOne({ where: { title: body.status } });
			if (!status) {
				throw new NotFoundException('Status not found, please add status to project first');
			}
		}

		task.title = body.title ?? task.title;
		task.description = body.description ?? task.description;
		task.priority = body.priority ?? task.priority;
		task.deadline = body.deadline ?? task.deadline;
		task.list = body.listId ? list : task.list;
		task.status = body.status ? status : task.status;

		return await this.taskRepository.save(task);
	}

	async delete(id: number): Promise<void> {
		const task = await this.taskRepository.findOne({ where: { id } });
		if (!task) {
			throw new NotFoundException('Task not found');
		}
		await this.taskRepository.remove(task);
		return;
	}

	async seed() {
		const priorities = [Priority.HIGH, Priority.MEDIUM, Priority.LOW, Priority.NONE];
		const statuses = ["Todo", "In Progress", "Done"];

		const allTasks = await this.taskRepository.find();
		if (allTasks.length > 0) return;

		for (let i = 0; i < 20; i++) {
			const task: CreateTaskDto = {
				title: faker.random.words(),
				description: faker.random.words(10),
				priority: priorities[Math.floor(Math.random() * 100) % priorities.length],
				deadline: faker.date.future(),
				listId: (Math.floor(Math.random() * 10) % 3) + 1,
				status: statuses[Math.floor(Math.random() * 10 % 3)],
			};
			await this.create(task, (Math.floor(Math.random() * 10) % 3) + 1);
		}
	}
}
