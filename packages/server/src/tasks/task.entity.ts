import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Priority } from 'src/enums/priority.enum';
import { List } from 'src/lists/list.entity';
import { Status } from 'src/projects/status.entity';

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

	@ManyToOne(() => Status, (status) => status.tasks)
	status: Status;

	@ManyToOne(() => List, (list) => list.tasks, { onDelete: 'CASCADE' })
	list: List;

	@Column()
	created_by: number;

	@Column()
	createdAt: Date;
}
