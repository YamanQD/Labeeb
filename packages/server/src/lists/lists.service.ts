import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/project.entity';
import { Task } from 'src/tasks/task.entity';
import { Repository } from 'typeorm';
import { List } from './list.entity';

@Injectable()
export class ListsService {
	constructor(
		@InjectRepository(List)
		private readonly listRepository: Repository<List>,
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>
	) { }

	async create(list: List): Promise<List> {
		return await this.listRepository.save(list);
	}

	async findListTasks(id: number): Promise<Task[]> {
		const list = await this.listRepository.findOne({
			where: { id },
			relations: { tasks: true }
		});
		if (!list) {
			throw new NotFoundException('List not found');
		}

		return list.tasks;
	}
}
