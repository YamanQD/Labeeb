import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/lists/list.entity';
import { Status } from 'src/projects/status.entity';
import { Tag } from 'src/projects/tags.entity';
import { User } from 'src/users/user.entity';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
	imports: [TypeOrmModule.forFeature([List, Task, Status, Tag, User])],
	controllers: [TasksController],
	providers: [TasksService],
	exports: [TasksService],
})
export class TasksModule { }
