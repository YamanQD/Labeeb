import { Project } from 'src/projects/project.entity';
import { Task } from 'src/tasks/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class List {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@ManyToOne(() => Project, (project) => project.lists)
	project: Project;

	@OneToMany(() => Task, (task) => task.list)
	tasks: Task[];
}
