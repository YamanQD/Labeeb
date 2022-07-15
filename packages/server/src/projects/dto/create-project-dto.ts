import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
	@IsNotEmpty()
	@Type(() => String)
	title: string;
}
