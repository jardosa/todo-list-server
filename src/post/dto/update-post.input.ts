import { PostStatus } from '../enums/post.enum';
import { CreatePostInput } from './create-post.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => ID)
  _id: string;

  @Field(() => PostStatus)
  status: PostStatus;
}
