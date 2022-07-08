import { Module } from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
  imports: [TasksService],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule { }
