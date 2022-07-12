import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/enums/role.enum';
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

  async seed() {
    const allUsers = await this.usersRepository.find();

    if (allUsers.filter((user) => user.username === 'admin').length === 0) {
      const admin = new User();
      admin.username = 'admin';
      admin.password = 'admin';
      admin.role = Role.ADMIN;
      await this.usersRepository.save(admin);
    }

    if (allUsers.filter((user) => user.username === 'Yaman').length === 0) {
      const user = new User();
      user.username = 'Yaman';
      user.password = 'Yaman';
      user.role = Role.USER;
      await this.usersRepository.save(user);
    }

    if (allUsers.filter((user) => user.username === 'Hasan').length === 0) {
      const user = new User();
      user.username = 'Hasan';
      user.password = 'Hasan';
      user.role = Role.USER;
      await this.usersRepository.save(user);
    }
  }
}
