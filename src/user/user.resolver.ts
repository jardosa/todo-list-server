import { SearchUsersInput } from './dto/search-users-input';
import { Resolver, Query, Mutation, Args, ID, PickType } from '@nestjs/graphql';
import { UserService } from './user.service';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './schema/user.schema';
import { SearchUserInput } from './dto/search-user-input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args('input', {
      type: () => SearchUsersInput,
      nullable: true,
    })
    input: SearchUsersInput,
  ) {
    return this.userService.findAll(input);
  }

  @Query(() => User, { name: 'user', nullable: true })
  findOne(
    @Args('input', { type: () => SearchUserInput })
    input: SearchUserInput,
  ): Promise<User> {
    return this.userService.findOne(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(updateUserInput._id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(
    @Args('_id', { type: () => ID }) _id: string,
  ): Promise<User> {
    return this.userService.remove(_id);
  }
}
