import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	created_by: number;

	@Column()
	createdAt: Date;
}