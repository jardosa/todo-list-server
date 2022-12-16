import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  imports: [
    UserModule,
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: config.EXPIRATION_IN_DAYS + 'd' },
    }),
  ],
})
export class AuthModule {}
