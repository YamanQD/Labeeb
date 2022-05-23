import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from 'src/enums/task-status.enum';
import { Priority } from 'src/enums/priority.enum';

@Entity()
export class Task {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ nullable: true })
	description: string;

	@Column('enum', { enum: Priority, default: Priority.NONE })
	priority: Priority;

	@Column({ nullable: true })
	deadline: Date;

	@Column()
	created_by: number;

	@Column()
	createdAt: Date;
}