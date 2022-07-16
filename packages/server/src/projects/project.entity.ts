import { List } from 'src/lists/list.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Status } from './status.entity';

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@OneToMany(() => List, (list) => list.project)
	lists: List[];

	@ManyToMany(() => Status, { nullable: true })
	@JoinTable({ name: 'project_status', inverseJoinColumn: { name: 'title' } })
	statuses: Status[];

	@ManyToMany(() => User, { nullable: true })
	@JoinTable({ name: 'project_user' })
	users: User[];
}
