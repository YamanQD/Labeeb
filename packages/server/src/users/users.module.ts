import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { EncryptService } from 'src/encrypt/encrypt.service';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UsersService, EncryptService],
	exports: [UsersService],
	controllers: [UsersController],
})
export class UsersModule {}
