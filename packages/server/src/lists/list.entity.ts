import { Task } from 'src/tasks/task.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class List {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@OneToMany(() => Task, task => task.project)
	tasks: Task[];
}