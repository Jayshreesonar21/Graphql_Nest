import { BadRequestException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AddUserArgs, UpdateUserArgs } from './args';
import { User as UserDTO } from '../../graphql';

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

  async deleteUser(userId: number): Promise<string> {
    try {
      await this.usersRepository
        .createQueryBuilder('user')
        .update(User)
        .set({ isDeleted: true })
        .where('id = :id', { id: userId })
        .execute();
      return 'Record deleted successfully';
    } catch (err) {
      console.log(':::::::: Delete user error :::::::', err);
      return err;
    }
  }

  async addUser(addUserArgs: AddUserArgs): Promise<User> {
    try {
      const user: User = new User();
      user.name = addUserArgs.name;
      user.email = addUserArgs.email;
      user.password = addUserArgs.password;
      user.profile = addUserArgs?.profile ?? null;

      return await this.usersRepository.save(user);
    } catch (err) {
      console.log(':::::::: Add user error :::::::', err);
      return err;
    }
  }

  async updateUser(
    userId: number,
    updateUserArgs: UpdateUserArgs,
  ): Promise<string> {
    try {
      await this.usersRepository
        .createQueryBuilder('user')
        .update(User)
        .set({ ...updateUserArgs })
        .where('id = :id', { id: userId })
        .andWhere('isDeleted = :isDeleted', { isDeleted: false })
        .execute();
      return 'Record updated successfully';
    } catch (err) {
      console.log(':::::::: Add user error :::::::', err);
      return err;
    }
  }
}
