import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import LoginPayload from './entities/loginPayload';
import { CreateUserInput } from 'src/user/dto/create-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginPayload)
  register(@Args('registerInput') registerInput: CreateUserInput) {
    return this.authService.register(registerInput);
  }
}
