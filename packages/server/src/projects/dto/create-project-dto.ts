import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
	@IsNotEmpty()
	title: string;

	@IsOptional()
	userIds?: number[];

	@IsOptional()
	statuses?: string[];
}
