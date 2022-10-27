import { BadRequestException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find({
        where: { isDeleted: false },
      });
      return users;
    } catch (err) {
      console.log(':::::: FindAll user error :::::: ', err);
      return err;
    }
  }

  async findOne(userId: number): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId, isDeleted: false },
      });
      return user;
    } catch (err) {
      console.log(':::::: FindOne user error :::::: ', err);
      return err;
    }
  }
}
