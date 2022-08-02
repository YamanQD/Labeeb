import { Task } from 'src/tasks/task.entity';
import { Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Tag {
	@PrimaryColumn()
	title: string;

	@ManyToMany(() => Project, { nullable: true })
	projects: Project[];

	@ManyToMany(() => Task, { nullable: true })
	tasks: Task[];
}
