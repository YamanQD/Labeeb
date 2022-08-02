import { Role } from '@labeeb/core';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Project } from 'src/projects/project.entity';

@Entity('labeeb_user')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column('enum', { enum: Role, default: Role.USER })
	role: Role;

	@ManyToMany(() => Project, { nullable: true })
	projects: Project[];
}
