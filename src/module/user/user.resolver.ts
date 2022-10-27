import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { User as UserDTO } from '../../graphql';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [User], { name: 'users' })
  getAllUsers() {
    return this.userService.findAll();
    // {
    //   getAllUsers{
    //     id
    //     name
    //     createdAt
    //   }
    // }
  }

  @Query((returns) => User, { name: 'findUserById', nullable: true })
  getUserById(@Args({ name: 'id', type: () => Int }) userId: number) {
    return this.userService.findOne(userId);
    // {
    //   findUserById(id: 3){
    //     id
    //     name
    //   }
    // }
  }
}
