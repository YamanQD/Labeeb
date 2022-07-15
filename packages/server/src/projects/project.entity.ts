import { List } from 'src/lists/list.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@OneToMany(() => List, (list) => list.project)
	lists: List[];
}
