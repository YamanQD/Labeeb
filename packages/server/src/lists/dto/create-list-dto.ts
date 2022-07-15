import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateListDto {
	@IsNotEmpty()
	@Type(() => String)
	title: string;

	@IsNotEmpty()
	projectId: number;
}
