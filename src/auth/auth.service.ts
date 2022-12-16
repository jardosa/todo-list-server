import { CreateUserInput } from './../user/dto/create-user.input';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInputError } from 'apollo-server-express';
import { hash } from 'bcrypt';
import config from 'src/config';
import { UserService } from 'src/user/user.service';
import validateEmail from 'src/utils/validateEmail';
import LoginPayload from './entities/loginPayload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const hashedPasswor = await hash(password, 10);
    return hashedPasswor;
  }

  async register(input: CreateUserInput): Promise<LoginPayload> {
    const { email, firstName, lastName, password } = input;

    const isEmailValid = validateEmail(email);

    if (!isEmailValid) throw new UserInputError('Email Address invalid');

    const existingUser = await this.userService.findOne({ email });

    if (existingUser) {
      throw new UserInputError('Email address has already been taken!');
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    const { _id } = newUser;

    const authToken = this.jwtService.sign(
      { i: newUser._id.toString() },
      { secret: config.JWT_SECRET },
    );

    return {
      authToken,
      profile: {
        _id: _id.toString(),
        lastName: newUser.lastName,
        firstName: newUser.firstName,
        email: newUser.email,
      },
    };
  }
}
