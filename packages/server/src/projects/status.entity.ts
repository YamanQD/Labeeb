import { Task } from 'src/tasks/task.entity';
import { Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Status {
	@PrimaryColumn()
	title: string;

	@ManyToMany(() => Project, { nullable: true })
	projects: Project[];

	@OneToMany(() => Task, (task) => task.status)
	tasks: Task[];
}
