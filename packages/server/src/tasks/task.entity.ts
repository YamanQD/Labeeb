import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Priority } from '@labeeb/core';
import { List } from 'src/lists/list.entity';
import { Status } from 'src/projects/status.entity';
import { Tag } from 'src/projects/tags.entity';
import { User } from 'src/users/user.entity';

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

	@ManyToOne(() => Status, (status) => status.tasks, { eager: true, onDelete: 'SET NULL' })
	status: Status;

	@ManyToMany(() => Tag, { nullable: true, eager: true })
	@JoinTable({ name: 'task_tags', inverseJoinColumn: { name: 'title' } })
	tags: Tag[];

	@ManyToMany(() => User, { nullable: true, eager: true })
	@JoinTable({ name: 'task_assignees', inverseJoinColumn: { name: 'email' } })
	assignees: User[];

	@ManyToOne(() => List, (list) => list.tasks, { onDelete: 'CASCADE' })
	list: List;

	@ManyToOne(() => User, (user) => user.tasks, { eager: true })
	owner: User;

	@Column()
	createdAt: Date;
}
