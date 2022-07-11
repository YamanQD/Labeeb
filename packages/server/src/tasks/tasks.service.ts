import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from 'src/lists/list.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

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
		const list = await this.listRepository.findOne({ where: { id: body.projectId } });

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
}
