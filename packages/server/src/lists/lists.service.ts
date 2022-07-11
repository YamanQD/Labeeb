import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/project.entity';
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
}
