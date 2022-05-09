import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>
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

	async create(body: Task, user: User): Promise<Task> {
		const newTask = this.taskRepository.create({
			created_by: user.id,
			createdAt: new Date(),
			...body
		});
		return await this.taskRepository.save(newTask);
	}
}
