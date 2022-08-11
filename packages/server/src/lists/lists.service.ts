import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/project.entity';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/create-list-dto';
import { UpdateListDto } from './dto/update-list-dto';
import { List } from './list.entity';

@Injectable()
export class ListsService {
	constructor(
		@InjectRepository(List)
		private readonly listRepository: Repository<List>,
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
	) { }

	async create(list: CreateListDto): Promise<List> {
		const project = await this.projectRepository.findOne({
			where: { id: list.projectId },
		});
		if (!project) {
			throw new NotFoundException(['Project not found']);
		}

		return await this.listRepository.save({ ...list, project });
	}

	async findAll(): Promise<List[]> {
		return await this.listRepository.find({ relations: ['project'] });
	}

	async findOne(id: number): Promise<List> {
		const list = await this.listRepository.findOne({
			where: { id },
			relations: { tasks: true },
		});
		if (!list) {
			throw new NotFoundException(['List not found']);
		}

		return list;
	}

	async update(id: number, list: UpdateListDto): Promise<List> {
		const listToUpdate = await this.findOne(id);
		listToUpdate.title = list.title;
		return await this.listRepository.save(listToUpdate);
	}

	async delete(id: number): Promise<void> {
		const list = await this.findOne(id);
		if (!list) {
			throw new NotFoundException(['List not found']);
		}

		await this.listRepository.remove(list);
		return;
	}

	async seed() {
		const allLists = await this.listRepository.find();
		if (allLists.length > 0) return;

		const lists: CreateListDto[] = [
			{
				title: 'Frontend',
				projectId: 1,
			},

			{
				title: 'Backend',
				projectId: 2,
			},

			{
				title: 'UI',
				projectId: 3,
			},
			{
				title: 'UX',
				projectId: 3,
			},
		];

		await lists.forEach(async (list) => {
			await this.create(list);
		});
	}
}
