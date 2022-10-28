import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdateUserArgs {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  profile?: string;
}
