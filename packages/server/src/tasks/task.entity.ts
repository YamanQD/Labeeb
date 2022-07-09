import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Priority } from 'src/enums/priority.enum';
import { Project } from 'src/projects/project.entity';

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

	@ManyToOne(() => Project, project => project.tasks)
	project: Project;

	@Column()
	created_by: number;

	@Column()
	createdAt: Date;
}