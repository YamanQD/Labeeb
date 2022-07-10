import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './list.entity';
import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  controllers: [ListsController],
  providers: [ListsService]
})
export class ListsModule { }
