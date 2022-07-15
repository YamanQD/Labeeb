import { List } from 'src/lists/list.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@OneToMany(() => List, (list) => list.project)
	lists: List[];

	@ManyToMany(() => User, { nullable: true })
	@JoinTable({ name: 'project_user' })
	users: User[];
}
