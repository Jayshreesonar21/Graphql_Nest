import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/models/post.model';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  // @Field()
  // password: string; // Do'nt show secure information

  @Field()
  role: string;

  @Field({ nullable: true })
  profile?: string;

  @Field((type) => [Post], { nullable: 'items' })
  posts: Post[];

  @Field()
  isDeleted: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
