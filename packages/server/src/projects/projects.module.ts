import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Project } from './project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Status } from './status.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Project, User, Status])],
	controllers: [ProjectsController],
	providers: [ProjectsService],
	exports: [ProjectsService],
})
export class ProjectsModule { }
