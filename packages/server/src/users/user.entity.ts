import { Role } from '@labeeb/core';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Project } from 'src/projects/project.entity';
import { Task } from 'src/tasks/task.entity';

@Entity('labeeb_user')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column({ select: false })
	password: string;

	@Column('enum', { enum: Role, default: Role.USER })
	role: Role;

	@ManyToMany(() => Project, project => project.users, { nullable: true })
	projects: Project[];

	@OneToMany(() => Task, (task) => task.owner)
	tasks: Task[];

	@ManyToMany(() => Task, { nullable: true })
	assignedTasks: Task[];
}
