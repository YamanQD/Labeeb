import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
	@IsNotEmpty()
	title: string;

	@IsOptional()
	description?: string;

	@IsOptional()
	userIds?: number[];

	@IsNotEmpty()
	statuses: { title: string, color: string }[];

	@IsNotEmpty()
	finalStatus: string;

	@IsOptional()
	tags?: string[];
}
