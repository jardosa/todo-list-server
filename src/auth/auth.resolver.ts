import { UserService } from 'src/user/user.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import LoginPayload from './entities/loginPayload';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';
import { GqlAuthGuard } from './guards/gqlAuth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => LoginPayload)
  register(@Args('registerInput') registerInput: CreateUserInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => LoginPayload)
  login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<LoginPayload> {
    return this.authService.login(email, password);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async whoAmI(@CurrentUser() user: User) {
    return this.userService.findOne({ _id: user._id });
  }
}
