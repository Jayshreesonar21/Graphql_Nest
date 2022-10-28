import { BadRequestException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { AddPostArgs } from './args/addPost.args';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private userService: UserService,
  ) {}

  async findAll(): Promise<Post[]> {
    try {
      const posts = await this.postRepository.find({
        where: { isDeleted: false },
      });
      return posts;
    } catch (err) {
      console.log(':::::: FindAll post error :::::: ', err);
      return err;
    }
  }

  async findOne(postId: number): Promise<Post> {
    try {
      const post = await this.postRepository.findOne({
        where: { id: postId, isDeleted: false },
        relations: ['user'],
      });
      return post;
    } catch (err) {
      console.log(':::::: FindOne post error :::::: ', err);
      return err;
    }
  }

  async addPost(addPostArgs: AddPostArgs): Promise<Post> {
    try {
      const post: Post = new Post();
      post.user = await this.userService.findOne(addPostArgs.userId);
      post.title = addPostArgs.title;
      post.description = addPostArgs?.description ?? null;

      return await this.postRepository.save(post);
    } catch (err) {
      console.log(':::::::: Add post error :::::::', err);
      return err;
    }
  }
}
