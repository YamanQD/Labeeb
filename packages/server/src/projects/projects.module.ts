import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/mail.service';
import { User } from 'src/users/user.entity';
import { Project } from './project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Status } from './status.entity';
import { Tag } from './tags.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Project, User, Status, Tag])],
	controllers: [ProjectsController],
	providers: [ProjectsService, MailService],
	exports: [ProjectsService],
})
export class ProjectsModule { }
