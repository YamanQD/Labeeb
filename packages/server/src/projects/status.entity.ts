import { Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Status {
	@PrimaryColumn()
	title: string;

	@ManyToMany(() => Project, { nullable: true })
	projects: Project[];
}
