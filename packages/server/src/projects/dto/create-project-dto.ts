import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {
	@IsNotEmpty()
	title: string;

	@IsOptional()
	userIds?: number[];
}
