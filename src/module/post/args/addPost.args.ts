import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/models/user.model';

@InputType()
export class AddPostArgs {
  @Field((type) => ID)
  userId: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}
