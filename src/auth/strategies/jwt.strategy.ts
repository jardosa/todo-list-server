import { AuthService } from './../auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import config from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      signOptions: {
        expiresIn: 3600 * 24 * config.EXPIRATION_IN_DAYS,
      },
      secretOrKey: config.JWT_SECRET,
    });
  }

  async validate(payload) {
    return { _id: payload.i };
  }
}
