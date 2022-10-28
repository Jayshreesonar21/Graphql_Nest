import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { AddUserArgs, UpdateUserArgs } from './args';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User], { name: 'users' })
  async getAllUsers() {
    return await this.userService.findAll();
    // {
    //   getAllUsers{
    //     id
    //     name
    //     createdAt
    //   }
    // }
  }

  @Query((returns) => User, { name: 'findUserById', nullable: true })
  async getUserById(@Args({ name: 'id', type: () => Int }) userId: number) {
    return await this.userService.findOne(userId);
    // {
    //   findUserById(id: 3){
    //     id
    //     name
    //   }
    // }
  }

  @Mutation((returns) => String, { name: 'deleteUserById' })
  async deleteUserById(@Args({ name: 'id', type: () => Int }) userId: number) {
    return await this.userService.deleteUser(userId);
    // mutation {
    //   deleteUserById(id: 3)
    // }
  }

  @Mutation((returns) => User, { name: 'addUser' })
  async addUser(@Args('addUserArgs') addUserArgs: AddUserArgs) {
    return await this.userService.addUser(addUserArgs);
    // mutation {
    //   addUser(addUserArgs: {
    //     name: "Test-1",
    //     email: "test@gmail.com",
    //     password: "12345678",
    //     profile: "test-profile"
    //   }) {
    //     id
    //     name
    //     email
    //     role
    //     profile
    //     isDeleted
    //     createdAt
    //     updatedAt
    //   }
    // }
  }

  @Mutation((returns) => String, { name: 'updateUser' })
  async updateUser(
    @Args({ name: 'id', type: () => Int }) userId: number,
    @Args('updateUserArgs') updateUserArgs: UpdateUserArgs,
  ) {
    return await this.userService.updateUser(userId, updateUserArgs);
    // mutation{
    //   updateUser(id: 9, updateUserArgs: {name: "updated-Test", email: "asda@gmail.com", profile: "xvsd"})
    // }
  }
}
