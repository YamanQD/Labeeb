import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { List } from 'src/lists/list.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { Priority } from 'src/enums/priority.enum';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,
		@InjectRepository(List)
		private readonly listRepository: Repository<List>
	) { }

	async findAll(): Promise<Task[]> {
		return await this.taskRepository.find();
	}

	async findOne(id: number): Promise<Task> {
		const task = await this.taskRepository.findOne({ where: { id } });
		if (!task) {
			throw new NotFoundException('Task not found');
		}
		return task;
	}

	async create(body: CreateTaskDto, userId: any): Promise<Task> {
		const list = await this.listRepository.findOne({ where: { id: body.listId } });

		const task = this.taskRepository.create({
			created_by: userId,
			createdAt: new Date(),
			list: list,
			...body
		});

		return await this.taskRepository.save(task);
	}

	async update(id: number, body: UpdateTaskDto): Promise<Task> {
		const task = await this.taskRepository.findOne({ where: { id } });
		if (!task) {
			throw new NotFoundException('Task not found');
		}
		await this.taskRepository.update(id, body);
		return await this.taskRepository.findOne({ where: { id } });
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

		const allTasks = await this.taskRepository.find();
		if (allTasks.length > 0) return;

		for (let i = 0; i < 10; i++) {
			const list = await this.listRepository.findOne({ where: { id: (Math.floor(Math.random() * 10) % 3) + 1 } });

			const task = {
				created_by: (Math.floor(Math.random() * 10) % 3) + 1,
				createdAt: new Date(),
				title: faker.lorem.sentence(),
				description: faker.lorem.sentences(3),
				priority: priorities[Math.floor(Math.random() * 100) % priorities.length],
				deadline: faker.date.future(),
				list
			}

			await this.taskRepository.save(task);
		}
	}
}
