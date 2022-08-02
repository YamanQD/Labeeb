import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Priority } from '@labeeb/core';
import { Optional } from '@nestjs/common';

export class CreateTaskDto {
	@IsNotEmpty()
	@Type(() => String)
	title: string;

	@IsNotEmpty()
	listId: number;

	@IsNotEmpty()
	status: string;

	@Optional()
	tag: string;

	@IsOptional()
	description?: string;

	@IsOptional()
	@IsEnum(Priority, {
		message: 'priority should be one of (none, low, medium, high)',
	})
	priority?: Priority;

	@IsOptional()
	@IsDate({ message: 'deadline should be a valid date' })
	@Type(() => Date)
	deadline?: Date;
}
