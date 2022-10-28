import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class AddUserArgs {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  profile?: string;
}
