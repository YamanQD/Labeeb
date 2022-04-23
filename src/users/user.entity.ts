import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('labeeb_user')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;
}