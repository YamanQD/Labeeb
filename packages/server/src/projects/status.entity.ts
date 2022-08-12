import { Task } from 'src/tasks/task.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Status {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	color: string;

	@ManyToOne(() => Project, (project) => project.statuses, { onDelete: 'CASCADE' })
	project: Project;

	@OneToMany(() => Task, (task) => task.status)
	tasks: Task[];
}
