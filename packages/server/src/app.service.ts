import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { TasksService } from './tasks/tasks.service';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private usersService: UsersService
  ) { }

  async getProfile(user: User) {
    const { password, ...profile } = await this.usersService.findOne(user.username);
    return profile;
  }

  async onApplicationBootstrap() {
    await this.usersService.seed();
  }
}
