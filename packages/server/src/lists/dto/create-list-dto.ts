import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateListDto {
	@IsNotEmpty()
	@Type(() => String)
	name: string;

	@IsNotEmpty()
	projectId: number;
}
