import { Args, Int, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './models/post.model';
import { AddPostArgs } from './args/addPost.args';
import { UserService } from '../user/user.service';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query((returns) => [Post], { name: 'posts' })
  async getAllPosts() {
    return await this.postService.findAll();
  }

  @Query((returns) => Post, { name: 'findPostById', nullable: true })
  async getPostById(@Args({ name: 'id', type: () => Int }) postId: number) {
    return await this.postService.findOne(postId);
  }

  @Mutation((returns) => Post, { name: 'addPost' })
  async addPost(@Args('addPostArgs') addPostArgs: AddPostArgs) {
    return await this.postService.addPost(addPostArgs);
    // mutation{
    //   addPost(addPostArgs:{
    //     userId: 1,
    //     title: "T-3",
    //     description: "D-3"
    //   }) {
    //     id
    //     title
    //     description
    //     isDeleted
    //     createdAt
    //     updatedAt
    //   }
    // }
  }
}
