import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
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

	async create(body: CreateTaskDto, userId: any): Promise<Task> {
		const newTask = this.taskRepository.create({
			created_by: userId,
			createdAt: new Date(),
			...body
		});
		return await this.taskRepository.save(newTask);
	}

	async delete(id: number): Promise<void> {
		const task = await this.taskRepository.findOne({ where: { id } });
		if (!task) {
			throw new NotFoundException('Task not found');
		}
		await this.taskRepository.remove(task,);
		return;
	}
}
