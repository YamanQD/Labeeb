import { Role } from '../enums/role.enum';
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

	@ManyToMany(() => Project, (project) => project.users, { nullable: true })
	projects: Project[];
}
