import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  create(user: User) {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async findOne(username: string) {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async profile(username: string) {
    const user = await this.findOne(username);
    if (user) {
      delete user.password;
      return user;
    }
    throw new NotFoundException('User not found');
  }
}
