import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/project.entity';
import { Task } from 'src/tasks/task.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list-dto';
import { List } from './list.entity';

@Injectable()
export class ListsService {
	constructor(
		@InjectRepository(List)
		private readonly listRepository: Repository<List>,
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>
	) { }

	async create(list: CreateListDto): Promise<List> {
		const project = await this.projectRepository.findOne({ where: { id: list.projectId } });
		if (!project) {
			throw new NotFoundException('Project not found');
		}

		return await this.listRepository.save({ ...list, project });
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