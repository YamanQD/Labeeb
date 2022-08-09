import { List } from 'src/lists/list.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Status } from './status.entity';
import { Tag } from './tags.entity';

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column({ nullable: true })
	description: string;

	@Column()
	finalStatus: string;

	@OneToMany(() => List, (list) => list.project)
	lists: List[];

	@ManyToMany(() => Status, { nullable: true })
	@JoinTable({ name: 'project_status', inverseJoinColumn: { name: 'title' } })
	statuses: Status[];

	@ManyToMany(() => Tag, { nullable: true })
	@JoinTable({ name: 'project_tags', inverseJoinColumn: { name: 'title' } })
	tags: Tag[];

	@ManyToMany(() => User, user => user.projects, { nullable: true })
	@JoinTable({ name: 'project_user' })
	users: User[];
}
