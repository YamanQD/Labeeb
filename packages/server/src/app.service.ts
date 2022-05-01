import { Injectable } from '@nestjs/common';
import { User } from './users/user.entity';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(private usersService: UsersService) { }

  async getProfile(user: User) {
    const { password, ...profile } = await this.usersService.findOne(user.username);
    return profile;
  }
}
