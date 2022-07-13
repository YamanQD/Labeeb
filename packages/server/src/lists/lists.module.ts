import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'src/projects/project.entity';
import { List } from './list.entity';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
	imports: [TypeOrmModule.forFeature([List, Project])],
	controllers: [ListsController],
	providers: [ListsService],
	exports: [ListsService],
})
export class ListsModule {}
