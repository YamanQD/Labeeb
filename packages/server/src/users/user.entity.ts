import { Role } from '../enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('labeeb_user')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@Column('enum', { enum: Role, default: Role.USER })
	role: Role;
}