import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Priority } from '@labeeb/core';
import { List } from 'src/lists/list.entity';
import { Status } from 'src/projects/status.entity';
import { Tag } from 'src/projects/tags.entity';

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

	@ManyToOne(() => Status, (status) => status.tasks, { eager: true })
	status: Status;

	@ManyToMany(() => Tag, { nullable: true })
	@JoinTable({ name: 'task_tags', inverseJoinColumn: { name: 'title' } })
	tags: Tag[];

	@ManyToOne(() => List, (list) => list.tasks, { onDelete: 'CASCADE' })
	list: List;

	@Column()
	created_by: number;

	@Column()
	createdAt: Date;
}
