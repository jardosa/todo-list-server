import { SearchUserInput } from './search-user-input';
import { Field, InputType, PickType } from '@nestjs/graphql';

@InputType()
export class SearchUsersInput extends PickType(SearchUserInput, [
  'firstName',
  'lastName',
]) {
  @Field({ defaultValue: 10, nullable: true })
  limit?: number;

  @Field({ defaultValue: 0, nullable: true })
  offset?: number;
}
